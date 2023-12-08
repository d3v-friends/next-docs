import fnDir from "@fn/dir";
import fnJson from "@fn/json";
import fnParam from "@fn/param";
import { IndexTree, Readable } from "@fn/type";
import fs from "fs";
import mdReader from "./reader";
import path from "path";

const getIndexFp = () => fnDir.getAbsolutePath("config", "index.json");

async function read(...truncates: boolean[]): Promise<IndexTree> {
    const idxFp = getIndexFp();
    const notExist = !fs.existsSync(idxFp);
    const t = fnParam.boolean(truncates);
    if (notExist || t) await create();
    const res: any = await fnJson.read(idxFp);
    res.extend = true;

    removeEmptyIdx(res);
    return res;
}

type ReadOpt = {
    readable: Readable;
    tags?: {
        tags: string[];
        isCorrect: boolean;
    };
};

async function readWithOpt(opt: ReadOpt, ...truncates: boolean[]): Promise<IndexTree> {
    let idx = await read(...truncates);

    if (opt.readable != "admin") {
        idx = exceptByReadable(idx, opt.readable);
    }

    if (opt.tags) {
        const { tags, isCorrect } = opt.tags;
        idx = exceptByTag(idx, tags, isCorrect);
    }

    removeEmptyIdx(idx)
    return idx;
}

function exceptByReadable(idx: IndexTree, readable: Readable): IndexTree {
    idx.fileList = idx.fileList.filter(v => mdReader.isReadable(v.readable, readable));
    for (const key in idx.children) {
        idx.children[key] = exceptByReadable(idx.children[key], readable);
    }
    return idx;
}

function exceptByTag(idx: IndexTree, tags: string[], isCorrect: boolean): IndexTree {
    idx.fileList = idx.fileList.filter(v => mdReader.isTags(v.tags, tags, isCorrect));
    for (const key in idx.children) {
        idx.children[key] = exceptByTag(idx.children[key], tags, isCorrect);
    }
    return idx;
}

function removeEmptyIdx(idx: IndexTree): boolean {
    let res = true;
    if (idx.fileList.length !== 0) res = false;

    if (Object.keys(idx.children).length !== 0) {
        for (let key in idx.children) {
            const has = removeEmptyIdx(idx.children[key]);
            if (has) {
                delete idx.children[key];
                continue;
            }
            res = false;
        }
    }

    return res;
}

async function create(): Promise<IndexTree> {
    const all = fnDir.getMDList();

    let root: IndexTree = {
        path: "/",
        basename: "root",
        fileList: [],
        children: {},
    };

    for (const filepath of all) {
        await appendIdx(root, filepath);
    }

    const fp = getIndexFp();
    await fnJson.write(fp, root);
    return root;
}

async function appendIdx(parent: IndexTree, filepath: string) {
    const split = filepath.split("/").filter(v => v.length !== 0);
    if (split.length === 0) return;
    if (split.length === 1) {
        if (path.extname(split[0]) !== ".md") return;
        const mdPath = fnDir.fitPathLinux(path.join(parent.path, split[0]));
        const md = await mdReader.read(mdPath);
        parent.fileList.push({
            path: mdPath,
            alias: mdReader.getAlias(md),
            readable: mdReader.getReadable(md),
            tags: mdReader.getTags(md),
        });
        return;
    }

    if (!parent.children.hasOwnProperty(split[0])) {
        const childPath = fnDir.fitPathLinux(path.join(parent.path, split[0]));
        parent.children[split[0]] = {
            path: childPath,
            basename: path.basename(childPath),
            fileList: [],
            children: {},
        };
    }

    await appendIdx(parent.children[split[0]], fnDir.fitPathLinux(path.join(...split.slice(1, split.length))));
}

const mdIdx = {
    create,
    read,
    readWithOpt,
    getIndexFp,
};

export default mdIdx;

import fnPath from "@fn/path";
import { Readable } from "@fn/type";
import fs from "fs";
import moment from "moment";
import path from "path";
import readline from "readline";
import fnParam from "./param";
import fnJson from "./json";
import fnDir from "./dir";

export type MD = {
    path: string;
    content: string;
    info: { [key: string]: string };
};

type Nullable<T> = T | null | undefined;
export type InfoKey = "create" | "update" | "readable" | "alias" | "title" | "describe";
const readableAll: Readable[] = ["admin", "maintainer", "subscriber", "all"];
const prefixInfo = "@@@";

// fp 는 상대경로이다.

const read = async (fp: string): Promise<MD> => {
    const sfp = fnDir.getAbsolutePath("content", fp);
    if (!fs.existsSync(sfp)) throw new Error(`not found file: filename=${fp}`);

    const rl = readline.createInterface({
        input: fs.createReadStream(sfp),
        crlfDelay: Infinity,
    });

    const res: MD = {
        path: fp,
        content: "",
        info: {},
    };

    for await (const line of rl) {
        if (line.trim().startsWith(prefixInfo)) {
            const str = line.slice(3, line.length);
            const kv = str.split("=");

            if (kv.length != 2) continue;
            const [key, value] = kv;
            res.info[key] = value;
            continue;
        }
        res.content += `${line}\n`;
    }

    return res;
};

const getDate = (md: MD, key: InfoKey): Nullable<Date> => {
    if (!md.info.hasOwnProperty(key)) return null;
    const value = md.info[key];
    if (!moment.isDate(value)) return null;
    return moment(value).toDate();
};

const getString = (md: MD, key: InfoKey): Nullable<string> => {
    if (!md.info.hasOwnProperty(key)) return null;
    const value = md.info[key];
    return `${value}`;
};

const getStringList = (md: MD, key: InfoKey): string[] => {
    if (!md.info.hasOwnProperty(key)) return [];
    return fnParam.commaToArray(md.info[key]);
};

const getReadable = (md: MD): Readable[] => {
    const ls = getStringList(md, "readable");
    const res: Readable[] = [];
    for (let item of ls) {
        if (!isReadableStr(item)) continue;
        res.push(item as Readable);
    }
    return res;
};

const isReadableStr = (v: string): boolean => {
    for (let elem of readableAll) {
        if (elem === v) return true;
    }
    return false;
};

const isReadable = (ls: Readable[], value: Readable): boolean => {
    for (let elem of ls) {
        if (elem === value) return true;
    }
    return false;
};

export type MDIndex = {
    path: string;
    name: string;
    readable: Readable[];
};

const getIndexFp = () => fnDir.getAbsolutePath("config", "index.json");
const createIndex = async (): Promise<MDIndex[]> => {
    const mdList = fnDir.getFileList("content", "md");
    const res: MDIndex[] = [];
    for (const mdPath of mdList) {
        const md = await read(mdPath);
        res.push({
            path: mdPath,
            name: getName(md),
            readable: getReadable(md),
        });
    }

    await fnJson.write(getIndexFp(), res);

    return res;
};

type OptIndex = {
    readable?: Readable;
};

const getIndexByFilter = async (opt: OptIndex, ...reindexes: boolean[]): Promise<MDIndex[]> => {
    let ls = await getIndex(...reindexes);

    if (opt.readable && opt.readable != "admin") {
        ls = ls.filter(v => {
            let filtered = true;
            if (opt.readable) {
                filtered = isReadable(v.readable, opt.readable);
            }
            return filtered;
        });
    }

    return ls;
};
const getIndex = async (...reindexes: boolean[]): Promise<MDIndex[]> => {
    const isExist = fnPath.isExist(getIndexFp());
    let reindex = false;
    if (reindexes.length !== 0) {
        reindex = reindexes[0];
    }

    if (isExist || reindex) {
        return createIndex();
    }

    return fnJson.read(getIndexFp());
};

const getName = (md: MD): string => {
    const alias = getString(md, "alias");
    if (alias) return alias;
    return fnPath.basename(md.path);
};

/* -------------------------------------------------------------------------------------------------- */
// indexing

type Index = {
    path: string;
    alias: string;
    children: Index[];
};

const reindexing = async (): Promise<Index[]> => {
    const all = fnDir.getMDList();
    const res: Index[] = [];
    for (const filepath of all) {
        const split = filepath.split("/");
    }

    return res;
};

const appendIdx = (parent: Index, filepath: string): Index => {
    // todo 여기부터 다시 만들기

    const split = filepath.split("/");
    for (const elem of split) {
        if (elem.endsWith(".md")) {
            parent.children.push({
                path: filepath,
                alias: "",
                children: [],
            });
        }
    }
};

/* -------------------------------------------------------------------------------------------------- */
const fnMD = {
    read,
    info: {
        name: getName,
        create: (md: MD): Nullable<Date> => getDate(md, "create"),
        update: (md: MD): Nullable<Date> => getDate(md, "create"),
        readable: getReadable,
        isReadable,
    },
    index: {
        get: getIndex,
        set: createIndex,
        filter: getIndexByFilter,
    },
};

export default fnMD;

import fs from "fs";
import moment from "moment";
import path from "path";
import readline from "readline";
import fnPath from "./path";
import fnParam from "./param";
import fnJson from "./json";

export type MD = {
    path: string;
    content: string;
    info: { [key: string]: string };
};

type Nullable<T> = T | null | undefined;
export type InfoKey = "create" | "update" | "readable" | "alias";
export type Readable = "admin" | "maintainer" | "reader" | "all";
const readableAll: Readable[] = ["admin", "maintainer", "reader", "all"];

const prefixInfo = "@@@";

const isExist = (fp: string): boolean => {
    return fs.existsSync(fp);
};

const read = async (fp: string): Promise<MD> => {
    const sfp = fnPath.absolute(fp);
    if (!isExist(sfp)) throw new Error(`not found file: filename=${fp}`);

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

type MDIndex = {
    path: string;
    name: string;
    readable: Readable[];
};

const configIndexFp = "/config/index.json";

const setIndex = async (): Promise<MDIndex[]> => {
    const mdList = await getMdList();
    const res: MDIndex[] = [];
    for (const mdPath of mdList) {
        const md = await read(mdPath);
        res.push({
            path: mdPath,
            name: getName(md),
            readable: getReadable(md),
        });
    }

    await fnJson.write(configIndexFp, res);

    return res;
};

type OptIndex = {
    readable?: Readable;
};

const getIndexByFilter = async (opt: OptIndex, ...reindexes: boolean[]): Promise<MDIndex[]> => {
    const ls = await getIndex(...reindexes);

    return ls.filter(v => {
        let filtered = true;
        if (opt.readable) {
            filtered = isReadable(v.readable, opt.readable);
        }
        return filtered;
    });
};
const getIndex = async (...reindexes: boolean[]): Promise<MDIndex[]> => {
    const isExist = !fnPath.isExist(configIndexFp);
    let reindex = false;
    if (reindexes.length !== 0) {
        reindex = reindexes[0];
    }

    if (isExist || reindex) {
        return setIndex();
    }

    return fnJson.read(configIndexFp);
};

const getMdList = async (): Promise<string[]> => {
    const cfp = fnPath.absolute("/content");
    return fs
        .readdirSync(cfp, {
            recursive: true,
            encoding: "utf8",
        })
        .filter(v => {
            return path.extname(v) === ".md";
        })
        .map(v => `/content/${fnPath.relative(v)}`);
};

const getName = (md: MD): string => {
    const alias = getString(md, "alias");
    if (alias) return alias;
    return fnPath.basename(md.path);
};
const fnMD = {
    read,
    info: {
        name: getName,
        create: (md: MD): Nullable<Date> => getDate(md, "create"),
        update: (md: MD): Nullable<Date> => getDate(md, "create"),
        subscriber: getReadable,
        isReadable,
    },
    index: {
        get: getIndex,
        set: setIndex,
        filter: getIndexByFilter,
    },
};

export default fnMD;

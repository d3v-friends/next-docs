import fnDir from "@fn/dir";
import fnParam from "@fn/param";
import fnPath from "@fn/path";
import { MD, MDInfoPrefix, Nullable, Readable, ReadableAll, InfoKey } from "@fn/type";
import fs from "fs";
import moment from "moment/moment";
import readline from "readline";

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
        if (line.trim().startsWith(MDInfoPrefix)) {
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

const getAlias = (md: MD): string => {
    const alias = getString(md, "alias");
    if (alias) return alias;
    return fnPath.basename(md.path);
};

const getString = (md: MD, key: InfoKey): Nullable<string> => {
    if (!md.info.hasOwnProperty(key)) return null;
    const value = md.info[key];
    return `${value}`;
};

const getDate = (md: MD, key: InfoKey): Nullable<Date> => {
    if (!md.info.hasOwnProperty(key)) return null;
    const value = md.info[key];
    if (!moment.isDate(value)) return null;
    return moment(value).toDate();
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
    for (let elem of ReadableAll) {
        if (elem === v) return true;
    }
    return false;
};

const isReadable = (ls: Readable[], r: Readable): boolean => {
    for (let item of ls) {
        if (item == r) return true;
    }
    return false;
};

const getTags = (md: MD): string[] => {
    return getStringList(md, "tags");
};

const isTags = (mdTags: string[], filterTag: string[], ...isCorrects: boolean[]): boolean => {
    const isCorrect = fnParam.boolean(isCorrects);

    if (isCorrect) {
        for (let tag of filterTag) {
            if (!hasStr(mdTags, tag)) {
                return false;
            }
        }
        return true;
    } else {
        for (const tag of filterTag) {
            if (hasStr(mdTags, tag)) {
                return true;
            }
        }
        return false;
    }
};

const hasStr = (ls: string[], v: string): boolean => {
    for (let item of ls) {
        if (item === v) return true;
    }
    return false;
};

const mdReader = {
    read,
    getAlias,
    getString,
    getCreate: (md: MD): Nullable<Date> => getDate(md, "create"),
    getUpdate: (md: MD): Nullable<Date> => getDate(md, "update"),
    getTags,
    getReadable,
    isReadable,
    isTags,
};

export default mdReader;

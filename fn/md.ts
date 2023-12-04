import { Nullable } from "./type";
import fs from "fs";
import moment from "moment";
import readline from "readline";
import fnPath from "./path";
import fnParam from "./param";

export type MD = {
    filepath: string;
    content: string;
    info: { [key: string]: string };
};

export type InfoKey = "create" | "update" | "subscriber";
export type Readable = "admin" | "maintainer" | "reader" | "all";
const readableAll: Readable[] = ["admin", "maintainer", "reader", "all"];

const prefixInfo = "@@@";

const isExist = (fp: string): boolean => {
    return fs.existsSync(fp);
};

const read = async (fp: string): Promise<MD> => {
    const sfp = fnPath.server(fp);
    if (!isExist(sfp)) throw new Error(`not found file: filename=${fp}`);

    const rl = readline.createInterface({
        input: fs.createReadStream(sfp),
        crlfDelay: Infinity,
    });

    const res: MD = {
        filepath: fp,
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

const getStringList = (md: MD, key: InfoKey): string[] => {
    if (!md.info.hasOwnProperty(key)) return [];
    return fnParam.commaToArray(md.info[key]);
};

const getSubscriber = (md: MD): Readable[] => {
    const ls = getStringList(md, "subscriber");
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

const fnMD = {
    read,
    info: {
        create: (md: MD): Nullable<Date> => getDate(md, "create"),
        update: (md: MD): Nullable<Date> => getDate(md, "create"),
        subscriber: getSubscriber,
        isReadable,
    },
};

export default fnMD;

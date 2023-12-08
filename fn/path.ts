import fnParam from "@fn/param";
import fs from "fs";
import path from "path";
import fnEnv from "./env";
import { join } from "path";

const absolutePath = (v: string, ...prefixes: string[]): string => {
    const prefix = fnParam.string(prefixes);

    const slash = getSlash();

    return join(fnEnv.string("ROOT_PATH", __dirname), prefix, v.replaceAll(slash.from, slash.to));
};

const relativePath = (v: string, ...prefixes: string[]): string => {
    const prefix = fnParam.string(prefixes);
    const slash = getSlash();
    const rootPath = fnEnv.string("ROOT_PATH", __dirname);
    if (!v.startsWith(rootPath)) return v;
    return path.join(prefix, v.slice(rootPath.length, v.length).replaceAll(slash.from, slash.to));
};

const basename = path.basename;

const getSlash = () => {
    const os = fnEnv.string("OS", "linux");
    const slash = {
        from: "\\",
        to: "/",
    };

    if (os === "Windows_NT") {
        slash.from = "/";
        slash.to = "\\";
    }

    return slash;
};

const isExist = (fp: string): boolean => {
    fp = absolutePath(fp);
    return fs.existsSync(fp);
};

const fnPath = {
    absolute: absolutePath,
    relative: relativePath,
    basename,
    isExist,
};

export default fnPath;

import fs from "fs";
import fnEnv from "./env";
import { join } from "path";

const absolutePath = (v: string): string => {
    const os = fnEnv.string("OS", "linux");
    const slash = {
        from: "\\",
        to: "/",
    };

    if (os === "Windows_NT") {
        slash.from = "/";
        slash.to = "\\";
    }

    return join(fnEnv.string("ROOT_PATH", __dirname), v.replaceAll(slash.from, slash.to));
};

const isExist = (fp: string): boolean => {
    fp = absolutePath(fp);
    return fs.existsSync(fp);
};

const fnPath = {
    server: absolutePath,
    isExist,
};

export default fnPath;

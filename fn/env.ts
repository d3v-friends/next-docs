import fnParam from "./param";
import fs from "fs";
import path from "path";
import readline from "readline";

export function string(key: string, ...defaultValue: string[]): string {
    const value = process.env[key] || fnParam.string(defaultValue);
    if (value == "") {
        console.log(`not found env: key=${key}`);
        process.exit(1);
    }
    return value;
}

const boolean = (key: string, ...defaults: boolean[]): boolean => {
    const value = process.env[key] || "";
    if (value === "") {
        if (defaults.length === 0) {
            console.log(`not found env: key=${key}`);
            process.exit(1);
        } else {
            return defaults[0];
        }
    }

    return value === "true";
};

const readFile = async (...str: string[]) => {
    const fp = path.join(...str);
    const rl = readline.createInterface({
        input: fs.createReadStream(fp),
        crlfDelay: Infinity,
    });
    for await (const line of rl) {
        const env = line.replaceAll(" ", "");
        const ls = env.split("=");
        if (ls.length != 2) continue;
        process.env[ls[0]] = ls[1];
    }
};

const fnEnv = {
    string,
    boolean,
    readFile,
};

export default fnEnv;

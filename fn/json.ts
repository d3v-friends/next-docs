import fs from "fs";
import readline from "readline";
import fnPath from "./path";

//--- 모든 path 는 상대주소로 입력 받는다.

async function read<DATA extends object>(fp: string): Promise<DATA> {
    fp = fnPath.absolute(fp);
    const rl = readline.createInterface({
        input: fs.createReadStream(fp),
        crlfDelay: Infinity,
    });

    let res = "";
    for await (const line of rl) {
        res += `${line}\n`;
    }

    return JSON.parse(res) as DATA;
}

async function write<DATA extends object>(fp: string, value: DATA): Promise<void> {
    fp = fnPath.absolute(fp);
    if (fs.existsSync(fp)) {
        fs.rmSync(fp);
    }
    fs.writeFileSync(fp, JSON.stringify(value));
    return;
}

function remove(fp: string) {
    fp = fnPath.absolute(fp);
    if (!fs.existsSync(fp)) {
        return;
    }
    fs.rmSync(fp);
}

function isExist(fp: string): boolean {
    fp = fnPath.absolute(fp);
    return fs.existsSync(fp);
}

const fnJson = {
    read,
    write,
    remove,
    isExist,
};

export default fnJson;

import fs from "fs";
import readline from "readline";

// 모든 주소는 절대 경로로 받는다

async function read<DATA extends object>(abPath: string): Promise<DATA> {
    const rl = readline.createInterface({
        input: fs.createReadStream(abPath),
        crlfDelay: Infinity,
    });

    let res = "";
    for await (const line of rl) {
        res += `${line}\n`;
    }

    return JSON.parse(res) as DATA;
}

async function write<DATA extends object>(abPath: string, value: DATA): Promise<void> {
    if (fs.existsSync(abPath)) {
        fs.rmSync(abPath);
    }
    fs.writeFileSync(abPath, JSON.stringify(value));
    return;
}

function remove(abPath: string) {
    if (!fs.existsSync(abPath)) {
        return;
    }
    fs.rmSync(abPath);
}

function isExist(abPath: string): boolean {
    return fs.existsSync(abPath);
}

const fnJson = {
    read,
    write,
    remove,
    isExist,
};

export default fnJson;

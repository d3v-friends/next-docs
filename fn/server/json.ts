import fs from "fs";
import readline from "readline";
import fnPath from "./path";

//--- 모든 path 는 상대주소로 입력 받는다.

const read = async <DATA extends object>(fp: string): Promise<DATA> => {
    fp = fnPath.server(fp);
    const rl = readline.createInterface({
        input: fs.createReadStream(fp),
        crlfDelay: Infinity,
    });

    let res = "";
    for await (const line of rl) {
        res += `${line}\n`;
    }

    return JSON.parse(res) as DATA;
};

const write = async <DATA extends object>(fp: string, value: DATA): Promise<void> => {
    fp = fnPath.server(fp);
    if (fs.existsSync(fp)) {
        fs.rmSync(fp);
    }
    fs.writeFileSync(fp, JSON.stringify(value));
    return;
};

const fnJson = {
    read,
    write,
};

export default fnJson;

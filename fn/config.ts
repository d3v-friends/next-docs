import fnDir from "@fn/dir";
import fnJson from "@fn/json";
import fs from "fs";

export type Config = {
    initAt: Date;
    signIn: boolean;
    signUp: boolean;
    reply: boolean;
};

function getConfigFp(): string {
    return fnDir.getAbsolutePath("config", "config.json");
}

async function init(): Promise<Config> {
    const fp = getConfigFp();
    if (fs.existsSync(fp)) {
        return fnJson.read(fp);
    }

    // 초기화
    // 1. create directory
    const ls: string[] = [];
    ls.push(fnDir.getAbsolutePath("config"));
    ls.push(fnDir.getAbsolutePath("content"));
    ls.push(fnDir.getAbsolutePath("config", "account"));
    for (let dir of ls) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true,
            });
        }
    }

    // init content
    const indexFp = fnDir.getAbsolutePath("content", "index.md");

    if (!fs.existsSync(indexFp)) {
    }

    const config: Config = {
        initAt: new Date(),
        signIn: true,
        signUp: true,
        reply: false,
    };

    await fnJson.write(fp, config);

    return config;
}

async function update(i: Partial<Config>): Promise<Config> {
    const prev = await read();
    throw new Error("todo");
    //todo
}

async function read(): Promise<Config> {
    const fp = fnDir.getAbsolutePath("config", "config.json");
    if (!fs.existsSync(fp)) {
        return init();
    }

    return fnJson.read<Config>(fp);
}

const fnConfig = {
    read,
    init,
};

export default fnConfig;

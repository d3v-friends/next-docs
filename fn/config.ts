import fnDir from "@fn/dir";
import fnJson from "@fn/json";
import fs from "fs";

export type Config = {
    signIn: boolean;
    signUp: boolean;
    reply: boolean;
};

async function read(): Promise<Config> {
    const fp = fnDir.getAbsolutePath("config", "config.json");
    if (!fs.existsSync(fp)) {
        const config: Config = {
            signIn: true,
            signUp: true,
            reply: false,
        };
        await fnJson.write(fp, config);
    }

    return fnJson.read<Config>(fp);
}

const fnConfig = {
    read,
};

export default fnConfig;

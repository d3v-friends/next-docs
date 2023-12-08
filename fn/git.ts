import fnDir from "@fn/dir";
import fnEnv from "@fn/env";
import fnParam from "@fn/param";
import { spawnSync } from "child_process";
import fs from "fs";

type Config = {
    repo: string;
    accessKey: string;
    username: string;
};

const getContentFp = () => fnDir.getAbsolutePath("content");
const getCredentialFp = () => fnDir.getAbsolutePath("config", ".git-credentials");

type ICredentialFile = {
    username: string;
    accessKey: string;
};

function getConfig(): Config {
    return {
        repo: fnEnv.string("GIT_REPO"),
        accessKey: fnEnv.string("GIT_KEY"),
        username: fnEnv.string("GIT_USERNAME"),
    };
}

// force 를 true 로 설정하면, 기존에 있던 저장소를 삭제한다.
async function init(...force: boolean[]) {
    const fp = getContentFp();
    if (fs.existsSync(fp)) {
        if (!fnParam.boolean(force)) {
            throw new Error("already has content");
        }
        fs.rmdirSync(fp);
    }

    // git credential
    const config = getConfig();
    const gitCredentialFp = getCredentialFp();
    if (fs.existsSync(gitCredentialFp)) {
        fs.rmSync(gitCredentialFp);
    }
    fs.writeFileSync(gitCredentialFp, getCredentialFile(config));

    // set git credential
    spawnSync("git", ["config", "--global", "--unset", "credential.helper"]);
    spawnSync("git", ["config", "--global"]);
}

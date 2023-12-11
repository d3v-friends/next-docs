// git cli 사용
// 시스템에 미리 설치되어 있어야 한다

import fnDir from "@fn/dir";
import fnJson from "@fn/json";
import { execSync } from "child_process";
import fs from "fs";
import moment from "moment/moment";

type Config = {
    url: string;
    key: string;
};

const getContentFp = () => fnDir.getAbsolutePath("content");
const getAuthFp = () => fnDir.getAbsolutePath("config", "github.json");

type ICredentialFile = {
    username: string;
    accessKey: string;
};

// force 를 true 로 설정하면, 기존에 있던 저장소를 삭제한다.
type InitArgs = {
    url: string;
    key: string;
};

async function init({ url, key }: InitArgs) {
    const fp = getContentFp();
    const authFp = getAuthFp();
    if (fs.existsSync(fp)) {
        fs.rmSync(fp, {
            force: true,
            recursive: true,
        });
    }

    if (fs.existsSync(authFp)) {
        fs.rmSync(authFp);
    }

    const config: Config = {
        url,
        key,
    };

    await fnJson.write(authFp, config);

    execSync(`git clone ${getGitPath(config)} ${fp}`, {
        cwd: __dirname,
    });
}

async function pull() {
    const fp = getContentFp();
    const config = await fnJson.read<Config>(getAuthFp());
    execSync(`git pull ${getGitPath(config)}`, {
        cwd: fp,
    });
}

async function repo() {
    const fp = getAuthFp();
    if (!fs.existsSync(fp)) {
        return "";
    }
    const info = await fnJson.read<Config>(getAuthFp());
    return info.url;
}

function getGitPath(c: Config): string {
    let url = c.url;
    if (url.startsWith("https://")) {
        url = url.replace("https://", "");
    }
    return `https://${c.key}@${url}`;
}

async function sync() {
    const config = await fnJson.read<Config>(getAuthFp());
    const url = getGitPath(config);
    const opt = {
        cwd: getContentFp(),
    };
    execSync(`git add .`, opt);
    execSync(`git commit -m "save: ${moment().format("yyMMDD-hh:mm")}"`, opt);
    execSync(`git pull ${url}`, opt);
    execSync(`git push --set-upstream origin main`, opt);
}

async function initCredential() {}
const fnGit = {
    init,
    pull,
    repo,
    sync,
};

export default fnGit;

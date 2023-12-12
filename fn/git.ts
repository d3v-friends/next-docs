// git cli 사용
// 시스템에 미리 설치되어 있어야 한다

import fnDir from "@fn/dir";
import fnFile from "@fn/file";
import fnJson from "@fn/json";
import { execSync } from "child_process";
import fs from "fs";
import moment from "moment/moment";

type Config = {
    url: string;
    key: string;
};

const getCredentialFp = () => fnDir.getAbsolutePath("config", ".git-credentials");
const getContentFp = () => fnDir.getAbsolutePath("content");
const getAuthFp = () => fnDir.getAbsolutePath("config", "github.json");
const getCredentialContent = ({ username, key }: { username: string; key: string }) => `
protocol=https
host=https://github.com
username=${username}
password=${key}
`;

// force 를 true 로 설정하면, 기존에 있던 저장소를 삭제한다.
type InitArgs = {
    url: string;
    key: string;
    username: string;
    email: string;
};

async function init({ url, username, key, email }: InitArgs) {
    const cwd = getContentFp();
    if (fs.existsSync(cwd)) {
        fs.rmSync(cwd, {
            recursive: true,
        });
    }

    initCredential({ username, email, key });
    execSync(`git clone ${url} ${cwd}`);
}

type InitCredentialArgs = {
    username: string;
    email: string;
    key: string;
};

function initCredential({ username, key, email }: InitCredentialArgs) {
    // prev credential remove
    // execSync("git config --global --unset credential.helper");

    // make credential file
    const helperFp = getCredentialFp();
    fnFile.write(helperFp, getCredentialContent({ username, key }));

    // set username, email, credential by global
    execSync(`git config --global user.name ${username}`);
    execSync(`git config --global user.email ${email}`);
    execSync(`git config --global credential.helper "store --file ${helperFp}"`);
}

async function repo() {
    const fp = getAuthFp();
    if (!fs.existsSync(fp)) {
        return "";
    }
    const info = await fnJson.read<Config>(getAuthFp());
    return info.url;
}

async function sync() {
    const opt = { cwd: getContentFp() };
    execSync(`git fetch`, opt);
}

const fnGit = {
    init,
    repo,
    sync,
};

export default fnGit;

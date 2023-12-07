import fnEnv from "@fn/env";
import fs from "fs";
import path from "path";

type Dir = "content" | "config";

// fp 는 모두 상대 주소이다.
// 상대 주소를 출력한다.
function getFileList(dir: Dir, ext: string): string[] {
    const slash = getSlashOS();
    const rootPath = getRootPath();
    const targetPath = path.join(rootPath, dir).replaceAll(slash.from, slash.to);

    if (!ext.startsWith(".")) ext = `.${ext}`;
    return (
        fs
            .readdirSync(targetPath, {
                recursive: true,
                encoding: "utf8",
            })
            .filter(v => {
                const isExt = path.extname(v) === ext;
                const isDir = path.extname(v) === "";
                return isExt || isDir;
            })
            // 상대 주소로 변경
            .map(v => v.replaceAll(targetPath, ""))
            // 리눅스 주소표현으로 변경
            .map(v => fitPathLinux(v))
    );
}

type FileTree = {
    parent: string;
    type: "file" | "dir";
    children?: string[];
};

function getFileTree(dir: Dir, ext: string) {}

function getMDList(): string[] {
    return getFileList("content", ".md");
}

// 상대 경로를 절대 경로로 바꿔준다.
function getAbsolutePath(dir: Dir, ...fps: string[]): string {
    const targetPath = path.join(getRootPath(), dir, ...fps);
    return fitPathOS(targetPath);
}

// fp는 여기서 절대경로가 들어온다.
function getRelativePath(dir: Dir, fp: string): string {
    const rootPath = path.join(getRootPath(), dir);
    if (fp.startsWith(rootPath)) return fp.replaceAll(rootPath, "");
    return fp;
}

function getRootPath(): string {
    return fnEnv.string("ROOT_PATH", __dirname);
}

type Slash = {
    from: string;
    to: string;
};

function fitPathOS(fp: string): string {
    const slash = getSlashOS();
    return fp.replaceAll(slash.from, slash.to);
}

function fitPathLinux(fp: string): string {
    return fp.replaceAll("\\", "/");
}

function getSlashOS(): Slash {
    const os = fnEnv.string("OS", "linux");
    const slash = {
        from: "\\",
        to: "/",
    };

    if (os === "Windows_NT") {
        slash.from = "/";
        slash.to = "\\";
    }

    return slash;
}

const fnDir = {
    getFileList,
    getMDList,
    getAbsolutePath,
    getRelativePath,
    fitPathOS,
    fitPathLinux,
};

export default fnDir;

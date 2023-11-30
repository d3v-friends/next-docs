const fnUrl = {
    glue: (...ls: string[]): string => {
        let res = "";
        for (let l of ls) {
            if (l === "") continue;
            res += `/${l}`;
        }
        return res.replaceAll("//", "/");
    },
    path: (path: string): string => {
        let ls = path.split("/").filter(v => v !== "");
        if (ls.length === 0) return "/";

        if (ls[ls.length - 1].indexOf(".") !== -1) {
            if (ls.length === 1) return "/";
            ls = ls.slice(0, ls.length - 1);
        }

        let res = "";
        for (const elem of ls) {
            res += `/${elem}`;
        }

        return res;
    },
    // wd = workdir
    filter: (wd: string, ls: string[]): string[] => {
        const res: string[] = [];
        for (let strPath of ls) {
            if (!strPath.startsWith(wd)) continue;
            const lastPathLs = strPath
                .replace(wd, "")
                .split("/")
                .filter(v => v !== "");
            if (lastPathLs.length != 1) continue;
            if (!strPath.endsWith(".md")) continue;
            res.push(strPath);
        }
        return res;
    },
    // file name or directory name
    basename: (str: string): string => {
        const ls = str.split("/").filter(v => v !== "");
        if (ls.length === 0) return "/";
        return ls[ls.length - 1];
    },
    parentDir: (str: string): string => {
        str = fnUrl.path(str);
        if (str === "/") return "/";

        const ls = str.split("/").filter(v => v !== "");
        if (ls.length < 1) return "/";
        return fnUrl.glue(...ls.slice(0, ls.length - 2));
    },
    childDir: (wd: string, ls: string[]): string[] => {
        const res: string[] = [];

        for (const elem of ls) {
            const path = fnUrl.path(elem);
            if (!path.startsWith(wd)) continue;

            const withoutPwd = path.replace(wd, "");
            const pathLs = withoutPwd.split("/").filter(v => v !== "");

            if (pathLs.length === 0) continue;
            const child = fnUrl.glue(wd, pathLs[0]).replaceAll("//", "/");

            if (res.includes(child)) continue;

            res.push(child);
        }
        return res;
    },
};

export default fnUrl;

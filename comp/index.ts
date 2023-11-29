import fs from "fs";
import moment from "moment";
import path from "path";
import readline from "readline";

namespace fn {
    export const css = {
        merge: (...str: string[]): string => {
            let res = "";
            for (const v of str) {
                res += `${v} `;
            }
            res = res.slice(0, res.length - 1);
            return res;
        },
    };

    export const url = {
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
            str = url.path(str);
            if (str === "/") return "/";

            const ls = str.split("/").filter(v => v !== "");
            if (ls.length < 1) return "/";
            return url.glue(...ls.slice(0, ls.length - 2));
        },
        childDir: (wd: string, ls: string[]): string[] => {
            const res: string[] = [];

            for (const elem of ls) {
                const path = url.path(elem);
                if (!path.startsWith(wd)) continue;

                const withoutPwd = path.replace(wd, "");
                const pathLs = withoutPwd.split("/").filter(v => v !== "");

                if (pathLs.length === 0) continue;
                const child = url.glue(wd, pathLs[0]).replaceAll("//", "/");

                if (res.includes(child)) continue;

                res.push(child);
            }
            return res;
        },
    };

    // file read and write
    const rootFp = () => env.string("ROOT_PATH");
    const contentFp = () => env.string("CONTENT_PATH", "/content");
    const configFp = () => env.string("CONFIG_PATH", "/config");
    const prefixInfo = "@@@";

    export type Content = {
        content: string;
        info: { [key: string]: string };
    };

    // fp 는 모두 상대주소 이다.
    export const fileRw = {
        isExist: (fp: string): boolean => {
            fp = parseAbsolutePath(fp);
            return fs.existsSync(fp);
        },
        readJson: async <DATA extends object>(fp: string): Promise<DATA> => {
            fp = parseAbsolutePath(url.glue(configFp(), fp));
            return readJson(fp);
        },
        readMd: async (fp: string, ...readables: Readable[]): Promise<Content> => {
            fp = parseAbsolutePath(url.glue(contentFp(), fp));

            const rl = readline.createInterface({
                input: fs.createReadStream(fp),
                crlfDelay: Infinity,
            });

            const res: Content = {
                content: "",
                info: {},
            };

            for await (const line of rl) {
                if (line.trim().startsWith(prefixInfo)) {
                    const str = line.slice(3, line.length);
                    const ls = str.split("=");
                    if (ls.length != 2) {
                        continue;
                    }
                    res.info[ls[0]] = ls[1];
                    continue;
                }
                res.content += `${line}\n`;
            }

            if (readables.length === 0) {
                return res;
            }

            if (!fileRw.readable(res, readables[0])) {
                throw new Error("no has permission");
            }

            return res;
        },
        readable: (i: Content, readable: Readable): boolean => {
            if (!i.info.hasOwnProperty(keyReadable)) return false;
            const value = filterReadable(params.commaToArray(i.info[keyReadable]));
            return value.includes(readable);
        },
    };

    const readJson = async <DATA extends object>(fp: string): Promise<DATA> => {
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

    const writeJson = async <DATA extends object>(fp: string, value: DATA): Promise<void> => {
        if (fs.existsSync(fp)) {
            fs.rmSync(fp);
        }
        fs.writeFileSync(fp, JSON.stringify(value));
        return;
    };

    const parseAbsolutePath = (fp: string): string => {
        const os = env.string("OS", "linux");
        const slash = {
            from: "\\",
            to: "/",
        };
        if (os === "Windows_NT") {
            slash.from = "/";
            slash.to = "\\";
        }

        return path.join(rootFp(), fp).replaceAll(slash.from, slash.to);
    };

    // params
    export const params = {
        boolean: (v: boolean[]): boolean => {
            if (v.length === 0) return false;
            return v[0];
        },
        string: (v: string[]): string => {
            if (v.length === 0) return "";
            return v[0];
        },
        strComma: (keys: string[], suffix: string): string => {
            const parent = params.string(keys);
            if (parent === "") {
                return suffix;
            }

            return `${parent}.${suffix}`;
        },
        commaToArray: (str: string): string[] => {
            return str
                .split(",")
                .filter(v => v !== "")
                .map(v => v.trim());
        },
        arrayToComma: (ls: string[]): string => {
            let res = "";
            for (let elem of ls) {
                if (elem === "") continue;
                res += `${elem},`;
            }
            return res.slice(0, res.length - 1);
        },
    };

    // env
    export const env = {
        string: (key: string, ...defaultValue: string[]): string => {
            const value = process.env[key] || params.string(defaultValue);
            if (value == "") {
                console.log(`not found env: key=${key}`);
                process.exit(1);
            }
            return value;
        },
        boolean: (key: string): boolean => {
            return "true" === env.string(key);
        },
        int: (key: string): number => {
            return parseInt(env.string(key));
        },
        read: async (...str: string[]) => {
            const fp = path.join(...str);
            const rl = readline.createInterface({
                input: fs.createReadStream(fp),
                crlfDelay: Infinity,
            });
            for await (const line of rl) {
                const env = line.replaceAll(" ", "");
                const ls = env.split("=");
                if (ls.length != 2) continue;
                process.env[ls[0]] = ls[1];
            }
        },
    };

    type ContentIndex = {
        path: string;
        [keyCreate]?: string;
        [keyUpdate]?: string;
        [keyReadable]: Readable[];
    };

    type Readable = "admin" | "maintainer" | "subscriber" | "all";
    const ReadableAll: Readable[] = ["admin", "maintainer", "subscriber", "all"];
    const keyReadable = "readable";
    const keyCreate = "create";
    const keyUpdate = "update";
    const keyDates = [keyCreate, keyUpdate];
    const indexFp = "index.json";

    export const indexMD = {
        run: async (): Promise<ContentIndex[]> => {
            const mdList = await getContentFileList("md");
            const res: ContentIndex[] = [];

            for (let mdPath of mdList) {
                const content = await fileRw.readMd(mdPath);
                const idx: ContentIndex = {
                    path: mdPath,
                    readable: [],
                };

                if (content.info.hasOwnProperty(keyReadable)) {
                    const value = content.info[keyReadable];
                    idx.readable = filterReadable(params.commaToArray(value));
                } else {
                    idx.readable = ["admin"];
                }

                for (let key of keyDates) {
                    if (content.info.hasOwnProperty(key)) {
                        const value = content.info[key];
                        if (!moment.isDate(value)) continue;
                        (idx as any)[key] = moment(value).toISOString();
                    }
                }
                res.push(idx);
            }

            await writeJson(parseAbsolutePath(url.glue(configFp(), indexFp)), res);

            return res;
        },
        read: async (...reindexing: boolean[]): Promise<ContentIndex[]> => {
            const fp = parseAbsolutePath(url.glue(configFp(), indexFp));
            if (!fs.existsSync(fp) || params.boolean(reindexing)) {
                return indexMD.run();
            }
            return readJson(fp);
        },
        readList: async (reader: Readable, ...reindexing: boolean[]): Promise<string[]> => {
            const ls = await indexMD.read(...reindexing);

            if (reader == "admin") {
                return ls.map(v => v.path);
            }

            return ls.filter(v => v.readable.findIndex(v => v === reader) !== -1).map(v => v.path);
        },
    };

    const filterReadable = (ls: string[]): Readable[] => {
        const res: Readable[] = [];
        for (let elem of ls) {
            if (ReadableAll.findIndex(v => v === elem) === -1) {
                continue;
            }
            res.push(elem as Readable);
        }
        return res;
    };

    const getContentFileList = async (ext: string): Promise<string[]> => {
        if (!ext.startsWith(".")) ext = `.${ext}`;
        const fp = parseAbsolutePath(contentFp());

        return fs
            .readdirSync(fp, {
                recursive: true,
                encoding: "utf8",
            })
            .filter(v => {
                return path.extname(v) === ext;
            })
            .map(v => {
                if (!v.startsWith("/")) v = `/${v}`;
                return v;
            })
            .map(v => v.replaceAll(rootFp(), ""))
            .map(v => v.replaceAll("\\", "/"));
    };

    export const session = {
        getReadable: async (): Promise<Readable> => {
            return "all";
        },
    };
}
export default fn;

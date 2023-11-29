import fn from "@comp/index";
import Link from "next/link";
import { ReactNode, JSX } from "react";
import ImgText from "@pure/imgText";
import css from "./index.module.scss";

type Props = {
    wd: string;
    fileList: string[];
    parentDir: string;
    childDirList: string[];
    children?: ReactNode;
};

const {
    url: { basename },
} = fn;

const srcParent = "/asset/img/svg/dir_parent.svg";
const srcChild = "/asset/img/svg/dir_children.svg";
const srcMd = "/asset/img/svg/file.svg";

const comp = async ({ children, wd, childDirList, fileList }: Props): Promise<JSX.Element> => {
    const parentDirs = wd.split("/").filter(v => v !== "");
    const paddingLeft = 10;
    const wdPaddingLeft = parentDirs.length * paddingLeft;
    const getHref = (i: number): string => {
        return fn.url.glue(...parentDirs.slice(0, i + 1));
    };
    return (
        <div className={css.cont}>
            <div>{children}</div>
            <h3>Documents</h3>
            <Link className={css.link} href="/">
                <ImgText src={srcParent}>root</ImgText>
            </Link>

            <div style={{ paddingLeft: paddingLeft }}>
                {parentDirs.map((v, i) => (
                    <Link className={css.link} href={getHref(i)} key={i} style={{ paddingLeft: i * paddingLeft }}>
                        <ImgText src={srcParent}>{basename(v)}</ImgText>
                    </Link>
                ))}

                {childDirList.map((v, i) => (
                    <Link className={css.link} href={v} key={i} style={{ paddingLeft: wdPaddingLeft }}>
                        <ImgText src={srcChild}>{basename(v)}</ImgText>
                    </Link>
                ))}

                {fileList.map((v, i) => (
                    <Link className={css.link} href={v} key={i} style={{ paddingLeft: wdPaddingLeft }}>
                        <ImgText src={srcMd}>{basename(v)}</ImgText>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default comp;

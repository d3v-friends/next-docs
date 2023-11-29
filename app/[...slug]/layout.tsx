import fn from "@comp/index";
import { Metadata } from "next";
import { JSX, ReactNode } from "react";
import Layout from "@comby/layout";
import Side from "@comby/sidebar";

type Params = {
    params: {
        slug: string[];
    };
};

export const generateMetadata = async ({ params: { slug } }: Params): Promise<Metadata> => {
    return {
        title: `next-doc: ${fn.url.glue(...slug)}`,
    };
};

type Props = Params & { children?: ReactNode };

const layout = async ({ children, params: { slug } }: Props): Promise<JSX.Element> => {
    let path = fn.url.glue(...slug);
    if (!path.endsWith(".md")) {
        path = fn.url.glue(path, "index.md");
    }
    const wd = fn.url.path(path);
    const idx = await fn.indexMD.readList("all");
    const parentDir = fn.url.parentDir(wd);
    const childDirList = fn.url.childDir(wd, idx);
    const fileList = fn.url.filter(wd, idx);

    return (
        <>
            <Layout>
                <Side wd={wd} childDirList={childDirList} fileList={fileList} parentDir={parentDir}></Side>
                <>{children}</>
            </Layout>
        </>
    );
};

export default layout;

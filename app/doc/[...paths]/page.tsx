import Blocks from "@block/index";
import { getSession, readMD } from "@fn/action";
import fnEnv from "@fn/env";
import fnUrl from "@fn/url";
import { Metadata } from "next";
import { JSX } from "react";

export const generateMetadata = async ({ params: { paths } }: Props): Promise<Metadata> => {
    return {
        title: `${fnEnv.string("MT_PREFIX")}:${fnUrl.glue(...paths)}`,
    };
};

type Props = {
    params: {
        paths: string[];
    };
};

const { Markdown } = Blocks;

export default async function Page({ params: { paths } }: Props): Promise<JSX.Element> {
    const session = await getSession();

    let filepath = fnUrl.glue(...paths);
    if (!filepath.endsWith(".md")) {
        filepath = fnUrl.glue(filepath, "index.md");
    }

    try {
        const content = await readMD(filepath);
        return <Markdown>{content.content}</Markdown>;
    } catch (e) {
        return <div>not found document: {filepath}</div>;
    }
}

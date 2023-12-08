import Blocks from "@block/index";
import { getSession, readMD } from "@fn/action";
import fnUrl from "@fn/url";
import { JSX } from "react";

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

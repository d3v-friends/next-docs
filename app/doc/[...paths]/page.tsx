import fn from "@comp/index";
import fnUrl from "@pure/fnUrl";
import { JSX } from "react";
import Markdown from "@comby/markdown";

type Props = {
    params: {
        paths: string[];
    };
};

const Comp = async ({ params: { paths } }: Props): Promise<JSX.Element> => {
    let filepath = fnUrl.glue(...paths);
    if (!filepath.endsWith(".md")) {
        filepath = fnUrl.glue(filepath, "index.md");
    }

    const readable = await fn.session.getReadable();
    try {
        const content = await fn.fileRw.readMd(filepath, readable);
        return <Markdown>{content.content}</Markdown>;
    } catch (e) {
        return <div>not found document: {filepath}</div>;
    }
};

export default Comp;

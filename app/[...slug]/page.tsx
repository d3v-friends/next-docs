import fn from "@comp/index";
import { JSX } from "react";
import Markdown from "@pure/markdown";

type Props = {
    params: {
        slug: string[];
    };
};

const comp = async ({ params: { slug } }: Props): Promise<JSX.Element> => {
    let filepath = fn.url.glue(...slug);
    if (!filepath.endsWith(".md")) {
        filepath = fn.url.glue(filepath, "index.md");
    }

    const readable = await fn.session.getReadable();
    try {
        const content = await fn.fileRw.readMd(filepath, readable);
        return <Markdown>{content.content}</Markdown>;
    } catch (e) {
        return <div>not found document: {filepath}</div>;
    }
};

export default comp;

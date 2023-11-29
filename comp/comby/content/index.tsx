import fn from "@comp/index";
import { JSX } from "react";
import Markdown from "@pure/markdown";

type Props = {
    children: string;
};

const comp = async ({ children }: Props): Promise<JSX.Element> => {
    const content = await fn.fileRw.readMd(children);
    if (content.info["readable"]) {
    }

    return <Markdown>{content.content}</Markdown>;
};

export default comp;

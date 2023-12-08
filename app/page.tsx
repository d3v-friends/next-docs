import { readMD } from "@fn/action";
import { JSX } from "react";
import Markdown from "@block/markdown";

export default async function Page(): Promise<JSX.Element> {
    const content = await readMD("/index.md");
    return <Markdown>{content.content}</Markdown>;
}

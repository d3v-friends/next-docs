import { getSession } from "@action/sign";
import { Readable } from "@action/type";
import Markdown from "@comby/markdown";
import fnMD from "@fn/md";
import { GetStaticProps } from "next";

export default async function Page() {
    const content = await fnMD.read("/content/index.md");
    return <Markdown>{content.content}</Markdown>;
}

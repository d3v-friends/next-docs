import fn from "@comp/index";
import Markdown from "@comby/markdown";

export default async function Page() {
    const content = await fn.fileRw.readMd("/index.md");
    return <Markdown>{content.content}</Markdown>;
}

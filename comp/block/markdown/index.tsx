import Markdown from "react-markdown";
import gfm from "remark-gfm";
import comp from "./comp";
import Mermaid from "@block/mermaid";

type Props = {
    children: string;
};

export default async function Comp({ children }: Props) {
    return (
        <Mermaid>
            <Markdown rehypePlugins={[gfm]} components={comp} children={children} />
        </Mermaid>
    );
}

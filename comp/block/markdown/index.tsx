"use server";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import comp from "./comp";

type Props = {
    children: string;
};

export default async function Comp({ children }: Props) {
    return <Markdown rehypePlugins={[gfm]} components={comp} children={children} />;
}

import Block from "@block/index";
import fnMD from "@fn/md";
import fnMeta from "@fn/meta";
import { Metadata } from "next";
import { JSX } from "react";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: fnMeta.simple("Home"),
    };
};

const { Markdown } = Block;

export default async function Comp(): Promise<JSX.Element> {
    const md = await fnMD.reader.read("/index.md");
    return <Markdown>{md.content}</Markdown>;
}

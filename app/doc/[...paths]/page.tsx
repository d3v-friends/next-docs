"use server";
import Block from "@block/index";
import fnMD from "@fn/md";
import fnUrl from "@fn/url";
import { Metadata } from "next";

export const generateMetadata = async ({ params: { paths } }: Props): Promise<Metadata> => {
    let url = fnUrl.glue(...paths);
    if (url.startsWith("/doc")) {
        url = url.slice(4, url.length);
    }
    return {
        title: `Doc[${url}]`,
    };
};

type Props = {
    params: {
        paths: string[];
    };
    searchParams: {};
};

const { Markdown } = Block;

export default async function Comp({ params: { paths } }: Props) {
    let url = fnUrl.glue(...paths);
    if (url.startsWith("/doc")) {
        url = url.slice(4, url.length);
    }

    const content = await fnMD.reader.read(url);

    return <Markdown>{content.content}</Markdown>;
}

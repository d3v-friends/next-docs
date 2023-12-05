import fn from "@fn";
import { JSX } from "react";

type Props = {
    params: {
        paths: string[];
    };
};

const {
    url,
    sign: { getSession },
    md: { read },
} = fn;

export default async function Page({ params: { paths } }: Props): Promise<JSX.Element> {
    const session = await getSession();

    let filepath = url.glue(...paths);
    if (!filepath.endsWith(".md")) {
        filepath = url.glue(filepath, "index.md");
    }

    try {
        const content = await read(filepath);
        return <>{content.content}</>;
    } catch (e) {
        return <div>not found document: {filepath}</div>;
    }
}

import fn from "@fn";
import Tag from "@tag";
import { Metadata } from "next";
import { JSX, ReactNode } from "react";

type Props = Params & { children?: ReactNode };
type Params = {
    params: {
        paths: string[];
    };
};
export const generateMetadata = async ({ params: { paths } }: Params): Promise<Metadata> => {
    return {
        title: `next-doc: ${url.glue(...paths)}`,
    };
};

const { url } = fn;
const { Padding } = Tag;

export default async function Layout({ children, params: { paths } }: Props): Promise<JSX.Element> {
    let path = url.glue(...paths);
    if (!path.endsWith(".md")) {
        path = url.glue(path, "index.md");
    }

    return (
        <Padding padding={{ paddingLeft: 20 }}>
            <h1>{path}</h1>
            {children}
        </Padding>
    );
}

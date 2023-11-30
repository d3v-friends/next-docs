import fn from "@comp/index";
import Padding from "@pure/padding";
import { Metadata } from "next";
import { JSX, ReactNode } from "react";
import Layout from "@comby/layout";
import Side from "@comby/sidebar";
import Profile from "@comby/profile";

type Props = Params & { children?: ReactNode };
type Params = {
    params: {
        paths: string[];
    };
};

export const generateMetadata = async ({ params: { paths } }: Params): Promise<Metadata> => {
    return {
        title: `next-doc: ${fn.url.glue(...paths)}`,
    };
};

const layout = async ({ children, params: { paths } }: Props): Promise<JSX.Element> => {
    let path = fn.url.glue(...paths);
    if (!path.endsWith(".md")) {
        path = fn.url.glue(path, "index.md");
    }

    return (
        <Padding padding={{ paddingLeft: 20 }}>
            <h1>{path}</h1>
            {children}
        </Padding>
    );
};

export default layout;

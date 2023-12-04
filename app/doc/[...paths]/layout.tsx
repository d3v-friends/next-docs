import fnUrl from "@pure/fnUrl";
import Padding from "@pure/padding";
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
        title: `next-doc: ${fnUrl.glue(...paths)}`,
    };
};

const layout = async ({ children, params: { paths } }: Props): Promise<JSX.Element> => {
    let path = fnUrl.glue(...paths);
    if (!path.endsWith(".md")) {
        path = fnUrl.glue(path, "index.md");
    }

    return (
        <Padding padding={{ paddingLeft: 20 }}>
            <h1>{path}</h1>
            {children}
        </Padding>
    );
};

export default layout;

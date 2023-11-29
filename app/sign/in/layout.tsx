import { Metadata } from "next";
import { JSX, ReactNode } from "react";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "title",
        description: "page",
    };
};

type Props = {
    children?: ReactNode;
    params: {
        slug: string[],
    }
};

const layout = async ({ children }: Props): Promise<JSX.Element> => {
    return (
        <>
            <div>{children}</div>
        </>
    );
};

export default layout;

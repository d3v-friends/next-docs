import fnUrl from "@fn/url";
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

export default async function Layout({ children, params: { paths } }: Props): Promise<JSX.Element> {
    return <>{children}</>;
}

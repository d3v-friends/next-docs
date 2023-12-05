import fn from "@fn";
import { Metadata } from "next";
import { ReactNode, JSX } from "react";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: `title`,
    };
};

interface Props {
    children?: ReactNode;
}

const {
    sign: { getSession },
} = fn;

export default async function Layout({ children }: Props): Promise<JSX.Element> {
    const session = await getSession();
    if (session.account.readable !== "admin") return <>no has permission</>;
    return <>{children}</>;
}

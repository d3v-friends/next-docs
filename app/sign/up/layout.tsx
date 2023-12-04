import { Metadata } from "next";
import { JSX, ReactNode } from "react";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "sign up",
        description: "sign up",
    };
};

type Props = {
    children?: ReactNode;
};

export default async function Layout({ children }: Props): Promise<JSX.Element> {
    return <>{children}</>;
}

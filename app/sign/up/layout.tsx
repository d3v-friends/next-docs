import { getConfig } from "@fn/action";
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
    const config = await getConfig();
    if (!config.signUp) {
        return <>Sign up is not service. now</>;
    }

    return <>{children}</>;
}

"use server";
import { getSession } from "@action/sign";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { JSX, ReactNode } from "react";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "Sign in",
        description: "sign in",
    };
};

type Props = {
    children?: ReactNode;
};

export default async function Layout({ children }: Props): Promise<JSX.Element> {
    const session = await getSession();
    if (session.isSignIn) redirect("/");
    return <>{children}</>;
}

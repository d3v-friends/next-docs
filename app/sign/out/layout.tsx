"use server";
import fnMeta from "@fn/meta";
import { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
    params: {};
    searchParams: {};
};

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: fnMeta.simple("Sign out"),
    };
};

export default async function Comp({ children }: Props) {
    return <>{children}</>;
}

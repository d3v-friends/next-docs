"use server";
import fnMeta from "@fn/meta";
import { Metadata } from "next";
import Form from "@app/formGit";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: fnMeta.simple("Manage - Git"),
    };
};

type Props = {
    params: {};
    searchParams: {};
};

export default async function Comp({}: Props) {
    return <Form />;
}

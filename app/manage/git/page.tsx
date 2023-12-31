"use server";
import fnMeta from "@fn/meta";
import { Metadata } from "next";
import Form from "@form/manageGit";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: fnMeta.simple("Manage - Git"),
    };
};

export default async function Comp() {
    return <Form />;
}

"use server";
import fnMeta from "@fn/meta";
import { Metadata } from "next";
import Form from "@form/manageIdx";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: fnMeta.simple("Manage - Index"),
    };
};

export default async function Comp() {
    return <Form />;
}

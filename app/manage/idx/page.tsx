"use server";
import fnMeta from "@fn/meta";
import { Metadata } from "next";
import Form from "@app/formIdx";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: fnMeta.simple("Manage - Index"),
    };
};

type Props = {
    params: {};
    searchParams: {};
};

export default async function Comp({}: Props) {
    return <Form />;
}

import fnEnv from "@fn/env";
import Tags from "@tag/index";
import { Metadata } from "next";
import { JSX } from "react";
import FormReset from "./formReset";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: `${fnEnv.string("MT_PREFIX")}:Manage`,
    };
};

const { H3, Space } = Tags;

export default async function Page(): Promise<JSX.Element> {
    return (
        <>
            <H3>Manage</H3>
            <Space />
            <FormReset />
        </>
    );
}

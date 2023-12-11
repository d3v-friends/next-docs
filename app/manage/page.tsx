"use server";
import fnGit from "@fn/git";
import { Metadata } from "next";
import FormGit from "./formGit";
import FormIndex from "./formIndex";
import FormSync from "./formSync";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "manage",
    };
};

type Props = {
    params: {};
    searchParams: {};
};

export default async function Comp({}: Props) {
    const repo = await fnGit.repo();

    return (
        <>
            <h3 className="mb-200">Manage</h3>
            <FormIndex />
            <div className="height-300" />

            <FormGit repo={repo} />
            <div className="height-300" />
            <FormSync />
        </>
    );
}

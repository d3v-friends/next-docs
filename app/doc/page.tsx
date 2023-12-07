"use server";
import fnEnv from "@fn/env";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: `${fnEnv.string("MT_PREFIX")}:Doc`,
    };
};

type Props = {
    params: {};
    searchParams: {
        word?: string;
    };
};

export default async function Page({ searchParams }: Props) {
    return <>Open soon</>;
}

"use server";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: ``,
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

"use server";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "title",
    };
};

type Props = {
    searchParams: {
        filter?: string;
    };
};

export default async function Comp({ searchParams: { filter } }: Props) {
    return <></>;
}

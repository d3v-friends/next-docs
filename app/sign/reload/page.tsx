"use server";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "title",
        description: "page",
    };
};

type Props = {
    params: {};
    searchParams: {};
};

export default async function Comp({}: Props) {
    return <></>;
}

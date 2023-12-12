"use server";
import fnMeta from "@fn/meta";
import { Metadata } from "next";
import Form from "./formSignUp";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: fnMeta.simple("Sign up"),
    };
};

type Props = {
    params: {};
    searchParams: {};
};

export default async function Comp({}: Props) {
    return (
        <>
            <h3 className="mb-100">Sign up</h3>
            <Form />
        </>
    );
}

"use server";
import fnMeta from "@fn/meta";
import { Metadata } from "next";
import Form from "@form/signIn";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: fnMeta.simple("Sign in"),
    };
};

export default async function Comp() {
    return (
        <>
            <h3 className="mb-100">Sign in</h3>
            <Form />
        </>
    );
}

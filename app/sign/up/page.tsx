"use server";
import fnMeta from "@fn/meta";
import { Metadata } from "next";
import Form from "@form/signUp";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: fnMeta.simple("Sign up"),
    };
};

export default async function Comp() {
    return (
        <>
            <h3 className="mb-100">Sign up</h3>
            <Form />
        </>
    );
}

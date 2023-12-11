"use server";
import { Metadata } from "next";
import Form from "./formSignIn";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "sign in",
    };
};

type Props = {
    params: {};
    searchParams: {};
};

export default async function Comp({}: Props) {
    return (
        <>
            <h3 className="mb-100">Sign in</h3>
            <Form />
        </>
    );
}

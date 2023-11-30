import { Metadata } from "next";
import { JSX, ReactNode } from "react";
import Form from "@pure/form";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "sign up",
        description: "sign up",
    };
};

type Props = {};

const Page = async ({}: Props): Promise<JSX.Element> => {
    const onSubmit = async (form: FormData) => {
        "use server";
        console.log("username", form.get("username"));
    };
    return (
        <>
            <Form submit={onSubmit}>
                {[
                    {
                        name: "username",
                        type: "text",
                        placeholder: "username",
                    },
                ]}
            </Form>
        </>
    );
};

export default Page;

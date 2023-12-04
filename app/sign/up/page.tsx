import CompClient from "@client/index";
import { FormAction } from "@tag/form";
import { Metadata } from "next";
import { JSX } from "react";
import Tag from "@tag";

const { Input, H1, H6, Button, Hr, Space, Link, Divider, Form } = Tag;
const { SignUp } = CompClient;

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "sign up",
        description: "sign up",
    };
};

type Props = {
    params: {};
    searchParams: {
        alert: string;
    };
};

const Page = async ({ searchParams: { alert } }: Props): Promise<JSX.Element> => {
    return (
        <>
            <H1>SignUp</H1>
            <Space height={"2rem"} />
            <SignUp />

            <Divider>
                <H6>if you already has account.</H6>
                <Link iconSrc="/asset/img/svg/account.svg" href={"/sign/in"}>
                    Sign in
                </Link>
            </Divider>
        </>
    );
};

export default Page;

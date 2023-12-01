import { Metadata } from "next";
import { JSX } from "react";
import Tag from "@tag";

const { Form, Input, H1, Button, Hr, Space, Link } = Tag;

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "sign up",
        description: "sign up",
    };
};

type Props = {};

const Page = async ({}: Props): Promise<JSX.Element> => {
    const onAction = async (form: FormData) => {
        "use server";
        console.log("username", form.get("username"));
        console.log("password", form.get("password"));
    };
    return (
        <>
            <H1>SignUp</H1>
            <Space height={30} />
            <Form action={onAction}>
                <Input type="text" name="username" label="username" />
                <Input type="text" name="password" label="password" />
                <Hr />

                <Button type="submit">Sign Up</Button>
                <Button type="button" style="outline"></Button>
            </Form>

            <Link iconSrc="/asset/img/svg/account.svg" href={"/sign/in"}>
                Sign in
            </Link>
        </>
    );
};

export default Page;

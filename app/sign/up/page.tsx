import { FormAction } from "../../../comp/client/forms";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { JSX } from "react";
import Tag from "@tag";
import Inputs from "../../../comp/client/forms";

const { Input, H1, H6, Button, Hr, Space, Link, Divider } = Tag;

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
    const onAction: FormAction = async (form: FormData) => {
        "use server";
        console.log(form.get("username"));
        console.log(form.get("password"));
        return revalidatePath("/");
    };

    return (
        <>
            <H1>SignUp</H1>
            <Space height={"2rem"} />
            <Inputs onAction={onAction}>
                <Input type="text" name="username" label="username" />
                <Input type="text" name="password" label="password" />
                <Hr />

                <Button type="submit">Sign Up</Button>
                <Button type="reset" style="outline">
                    Reset
                </Button>
            </Inputs>

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

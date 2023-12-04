import Client from "@client";
import { JSX } from "react";
import Pure from "@comp/pure";
import Tag from "@tag";
import signIn from "./signin.svg";

const { H1, H6, Space, Link, P1 } = Tag;
const { Inline } = Pure;
const { SignUp } = Client;

export default async function Page(): Promise<JSX.Element> {
    return (
        <>
            <H1>SignUp</H1>
            <Space height={"2rem"} />
            <SignUp />

            <Inline>
                <H6>if you already has account?</H6>
                <Link iconSrc={signIn} href={"/sign/in"}>
                    Sign in
                </Link>
            </Inline>
        </>
    );
}

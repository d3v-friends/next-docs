import App from "@app";
import Tag from "@tag";
import iconSrc from "./signup.svg";
import { JSX } from "react";

const { H1, Space, H6, Link, P1, Inline } = Tag;
const {
    Sign: { SignIn },
} = App;

export default async function Page(): Promise<JSX.Element> {
    return (
        <>
            <H1>SignIn</H1>
            <P1>Welcome back! next-docs</P1>
            <Space height={"2rem"} />
            <SignIn />

            <Inline>
                <H6>if you don't have account?</H6>
                <Link iconSrc={iconSrc} href={"/sign/up"}>
                    Sign up
                </Link>
            </Inline>
        </>
    );
}

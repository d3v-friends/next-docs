import Tags from "@tag/index";
import FormSignUp from "./formSignUp";
import { JSX } from "react";
import IconPack from "@block/icon/svg";

const { H1, H6, Space, Link, Inline } = Tags;
export default async function Page(): Promise<JSX.Element> {
    return (
        <>
            <H1>SignUp</H1>
            <Space height={"2rem"} />
            <FormSignUp />

            <Inline>
                <H6>if you already has account?</H6>
                <Link iconSrc={IconPack.Primary.SignIn} href={"/sign/in"}>
                    Sign in
                </Link>
            </Inline>
        </>
    );
}

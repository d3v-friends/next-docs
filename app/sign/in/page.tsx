"use server";
import Blocks from "@block/index";
import Inputs from "./inputs";
import Tags from "@tag/index";
import { JSX } from "react";

const { H1, Space, H6, Link, P1, Inline } = Tags;
const { IconPrimary } = Blocks;
export default async function Page(): Promise<JSX.Element> {
    return (
        <>
            <H1>SignIn</H1>
            <P1>Welcome back! next-docs</P1>
            <Space height={"2rem"} />
            <Inputs />
            <Inline>
                <H6>if you don't have account?</H6>
                <Link iconSrc={IconPrimary.Account} href={"/sign/up"}>
                    Sign up
                </Link>
            </Inline>
        </>
    );
}

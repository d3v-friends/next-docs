import Tags from "@tag/index";
import { JSX } from "react";
import FormReset from "./formReset";
import FormGit from "./formGit";

const { H3, Hr } = Tags;

export default async function Page(): Promise<JSX.Element> {
    return (
        <>
            <H3>Manage</H3>
            <FormReset />

            <Hr />
            <H3>Git reset</H3>
            <FormGit />
        </>
    );
}

import Tags from "@tag/index";
import { JSX } from "react";
import FormReset from "./formReset";

const { H3, Space } = Tags;

export default async function Page(): Promise<JSX.Element> {
    return (
        <>
            <H3>Manage</H3>
            <Space />
            <FormReset />
        </>
    );
}

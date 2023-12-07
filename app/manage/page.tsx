import Tags from "@tag/index";
import { JSX } from "react";
import FormReset from "./formReset";

type Props = {};

const { H3, Space } = Tags;

export default async function Page({}: Props): Promise<JSX.Element> {
    return (
        <>
            <H3>Manage</H3>
            <Space/>
            <FormReset />
        </>
    );
}

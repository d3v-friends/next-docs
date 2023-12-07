"use server";
import { IndexTree } from "@fn/type";
import Tags from "@tag/index";
import Image from "next/image";
import FileList from "./filelist";
import { JSX } from "react";
import css from "./index.module.scss";

type Props = {
    hideLogo?: boolean;
    idxContent: IndexTree;
    idxDoc: IndexTree;
};

const { Space, P1, H5, Hr } = Tags;

export default async function Comp({ idxContent, idxDoc, hideLogo }: Props): Promise<JSX.Element> {
    return (
        <>
            {!hideLogo && (
                <>
                    <Image className={css.imgLogo} src={"/asset/img/png/dev-friends.png"} alt="dev_friends" width={200} height={200} />
                    <Space />
                    <P1>Welcome my space</P1>
                    <P1>working on software engineer, devops</P1>
                    <Hr />
                </>
            )}

            <H5>contents</H5>
            <Space height="0.3rem" />
            <FileList idx={idxContent} />

            <Hr />
            <H5>documents</H5>
            <Space height="0.3rem" />
            <FileList idx={idxDoc} />
        </>
    );
}

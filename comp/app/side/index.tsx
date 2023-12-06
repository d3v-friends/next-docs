"use server";
import { SideContent } from "@fn/config";
import Tags from "@tag/index";
import Image from "next/image";
import FileList from "./fileList";
import { MDIndex } from "@fn/md";
import { JSX } from "react";
import css from "./index.module.scss";

type Props = {
    fileList: MDIndex[];
    sideContent: SideContent[];
};

const { Space, H3, P1 } = Tags;

export default async function Comp({ fileList, sideContent }: Props): Promise<JSX.Element> {
    return (
        <>
            <Image className={css.imgLogo} src={"/asset/img/png/dev-friends.png"} alt="dev_friends" width={200} height={200} />
            <Space />
            <H3>dev_friends</H3>
            <Space height="0.4rem" />
            <P1>Welcome my space</P1>
            <Space height="0.2rem" />
            <P1>working on software engineer, devops</P1>
            <Space height="2rem" />

            <H3>contents</H3>
            {sideContent.map((v, i) => (
                <div key={i}>{v.name}</div>
            ))}

            <Space height="2rem" />
            <FileList fileList={fileList} />
        </>
    );
}

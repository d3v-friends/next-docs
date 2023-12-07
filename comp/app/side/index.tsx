"use server";
import { getSession } from "@fn/action";
import fnMD from "@fn/md";
import Tags from "@tag/index";
import Image from "next/image";
import FileList from "./filelist";
import { JSX } from "react";
import css from "./index.module.scss";

type Props = {};

const { Space, H3, P1, H5, Hr } = Tags;

export default async function Comp({}: Props): Promise<JSX.Element> {
    const session = await getSession();
    const contentIdx = await fnMD.idx.readWithOpt({
        readable: session.account.readable,
        tags: {
            tags: ["contents"],
            isCorrect: true,
        },
    });

    const docIdx = await fnMD.idx.readWithOpt({
        readable: session.account.readable,
    });

    return (
        <>
            <Image className={css.imgLogo} src={"/asset/img/png/dev-friends.png"} alt="dev_friends" width={200} height={200} />
            <Space />
            <H3>dev_friends</H3>
            <P1>Welcome my space</P1>
            <P1>working on software engineer, devops</P1>
            <Hr />

            <H5>contents</H5>
            <Space height="0.3rem" />
            <FileList idx={contentIdx} />

            <Hr />
            <H5>documents</H5>
            <Space height="0.3rem" />
            <FileList idx={docIdx} />
        </>
    );
}

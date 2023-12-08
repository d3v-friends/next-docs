"use server";
import Blocks from "@block/index";
import { getSession } from "@fn/action";
import fnMD from "@fn/md";
import Side from "@app/side";

type Props = {
    params: {};
    searchParams: {};
};

const { IsMobile } = Blocks;

export default async function Page({}: Props) {
    const session = await getSession();

    const idxContent = await fnMD.idx.readWithOpt({
        readable: session.account.readable,
        tags: {
            tags: ["contents"],
            isCorrect: true,
        },
    });

    const idxDoc = await fnMD.idx.readWithOpt({
        readable: session.account.readable,
    });

    return (
        <>
            <IsMobile notMobile={<>not found page</>} mobile={<Side idxContent={idxContent} idxDoc={idxDoc} hideLogo />} />
        </>
    );
}

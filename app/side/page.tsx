"use server";
import { getSession } from "@fn/action";
import fnMD from "@fn/md";
import fnMeta from "@fn/meta";
import FormSync from "@form/manageSync";
import { Metadata } from "next";
import FileList from "@app/filelist";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: fnMeta.simple("Menu"),
    };
};

export default async function Page() {
    const session = await getSession();
    const fileList = await fnMD.idx.readWithOpt({
        readable: session.account.readable,
    });

    const contents = await fnMD.idx.readWithOpt({
        readable: session.account.readable,
        tags: {
            tags: ["content"],
            isCorrect: false,
        },
    });

    const isAdmin = session.account.readable === "admin";

    return (
        <>
            <div className="mb-60" />

            <h5>contents</h5>
            <div className="mb-30" />

            <FileList idx={contents} />

            <hr />
            <h5>documents</h5>
            <div className="mb-30" />
            <FileList idx={fileList} />

            <div className="mb-200" />
            {isAdmin && <FormSync />}
        </>
    );
}

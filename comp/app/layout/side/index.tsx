"use server";
import FileList from "@app/filelist";
import { getSession } from "@fn/action";
import fnMD from "@fn/md";
import Profile from "./profile";
import css from "./index.module.scss";

type Props = {};

export default async function Comp({}: Props) {
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

    return (
        <div className={css.cont}>
            <Profile />
            <h5>contents</h5>
            <div className="mb-30" />
            <FileList idx={contents} />

            <hr />
            <h5>documents</h5>
            <div className="mb-30" />
            <FileList idx={fileList} />
        </div>
    );
}

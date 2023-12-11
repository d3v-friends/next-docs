"use server";
import FileTree from "./filetree";
import Profile from "./profile";
import css from "./index.module.scss";

type Props = {};

export default async function Comp({}: Props) {
    return (
        <div className={css.cont}>
            <Profile />
            <FileTree />
        </div>
    );
}

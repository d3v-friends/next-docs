import fnCss from "@fnClient/css";
import Tag from "@tag";
import Image from "next/image";
import { JSX } from "react";
import FileTree from "@client/fileTree";
import { v4 } from "uuid";
import css from "./index.module.scss";

type Props = {
    fileList: string[];
};

const { merge } = fnCss;
const { H3 } = Tag;

const srcDevFriends = "/asset/img/png/dev-friends.png";
const comp = ({ fileList }: Props): JSX.Element => {
    return (
        <>
            <div className={css.cont}>
                <Image className={css.logo} src={srcDevFriends} alt={"dev-friends"} width={400} height={400} />
                <div className={merge(css.info, css.textCenter)}>
                    <H3>dev_friends</H3>
                </div>
            </div>
            <FileTree id={v4()} fileList={fileList} />
        </>
    );
};

export default comp;

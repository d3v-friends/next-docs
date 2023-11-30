import fn from "@comp/index";
import Image from "next/image";
import { JSX } from "react";
import H from "@pure/tag-h";
import css from "./index.module.scss";

type Props = {
    fileList: string[];
};

const {
    css: { merge },
} = fn;

const srcDevFriends = "/asset/img/png/dev-friends.png";
const comp = async ({}: Props): Promise<JSX.Element> => {
    return (
        <div className={css.cont}>
            <Image className={css.logo} src={srcDevFriends} alt={"dev-friends"} width={500} height={500} />
            <div className={merge(css.info, css.textCenter)}>
                <H size={"h3"}>dev_friends</H>
            </div>
        </div>
    );
};

export default comp;

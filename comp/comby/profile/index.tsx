import Image from "next/image";
import { JSX } from "react";
import css from "./index.module.scss";

type Props = {};

const srcDevFriends = "/asset/img/png/dev-friends.png";
const comp = async ({}: Props): Promise<JSX.Element> => {
    return (
        <div className={css.cont}>
            <Image className={css.logo} src={srcDevFriends} alt={"dev-friends"} width={500} height={500} />
            <div className={css.info}>
                <h3>dev_friends</h3>
            </div>
        </div>
    );
};

export default comp;

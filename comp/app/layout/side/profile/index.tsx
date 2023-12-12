import React from "react";
import Image from "next/image";
import css from "./index.module.scss";

export default function Comp() {
    return (
        <div className={css.cont}>
            <Image className={css.logo} src={"/asset/img/png/dev-friends.png"} alt="dev-friends" width={200} height={200} />
            <div className="mb-100" />
            <p>Welcome my space</p>
            <p>working on software engineer, devops</p>
            <hr />
        </div>
    );
}

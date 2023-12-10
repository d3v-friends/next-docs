"use client";

import { ReactNode } from "react";
import css from "./index.module.scss";
import Icon from "@block/icon";
import svg from "@svg/index";

type Props = {
    code?: string;
    children?: string;
};

export default function Comp({ children, code }: Props): ReactNode {
    const onClick = () => {
        window.navigator.clipboard.writeText(code || "").catch(() => console.log("fail copy to clipboard"));
    };
    return (
        <div className={css.cont}>
            <div className={css.language}>{children || "null"}</div>
            <div className={css.children} onClick={onClick}>
                <Icon isText src={svg.primary.copy} hover>
                    copy
                </Icon>
            </div>
        </div>
    );
}

"use client";

import Image from "next/image";
import { ReactNode } from "react";
import css from "comp/block/markdown/comp/code/header/index.module.scss";
import svg from "@svg/index";

type Props = {
    code?: string;
    children?: string;
    noCopy?: boolean;
};

export default function Comp({ children, code, noCopy }: Props): ReactNode {
    children = children || "";
    code = code || "";

    const onClick = () => {
        window.navigator.clipboard.writeText(code || "").catch(() => console.log("fail copy to clipboard"));
    };

    return (
        <div className={css.cont}>
            <div className={css.language}>{children}</div>
            {!noCopy && (
                <div className={css.copy} onClick={onClick}>
                    <Image className={css.img} src={svg.primary.copy} alt="copy" width={20} height={20} />
                    copy
                </div>
            )}
        </div>
    );
}

"use client";
import svg from "@svg/index";
import Image from "next/image";
import { ReactNode } from "react";
import css from "./index.module.scss";

type Props = {
    children?: ReactNode;
    onClose?: Function;
};

export default function Comp({ children, onClose }: Props) {
    const onClick = () => {
        if (onClose) onClose();
    };

    return (
        <div className={css.cont}>
            <div className={css.children}>{children}</div>
            <div className={css.close} onClick={() => onClick()}>
                <Image className={css.img} src={svg.secondary.close} alt="close" width={20} height={20}></Image>
            </div>
        </div>
    );
}

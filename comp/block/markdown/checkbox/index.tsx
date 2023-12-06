import Image from "next/image";
import { JSX, ReactNode } from "react";
import css from "./index.module.scss";
import IconPack from "@block/icon/svg/primary";

interface Props {
    checked?: boolean;
    children?: ReactNode;
}

export default function Comp({ children, checked }: Props): JSX.Element {
    checked = checked || false;
    const src = checked ? IconPack.CheckTrue : IconPack.CheckFalse;
    return (
        <div className={css.cont}>
            <Image className={css.img} src={src} alt={"checkbox"} height={30} width={30} />
            <div className={css.children}>{children}</div>
        </div>
    );
}

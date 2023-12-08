import IconPack from "@block/icon/svg";
import fnCss from "@fn/css";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import css from "./index.module.scss";

type Props = {
    title?: ReactNode;
    children?: ReactNode;
};

const { Background } = IconPack;

export default function Comp({ children, title }: Props) {
    return (
        <div className={css.cont}>
            <div className={css.inner}>
                <Link className={fnCss.merge(css.title, css.titlePc)} href="/">
                    {title}
                </Link>
                <Link className={fnCss.merge(css.title, css.titleMobile)} href="/side">
                    <Image className={css.menu} src={Background.Menu} alt="menu" height={20} width={20} />
                    {title}
                </Link>
                <div className={css.flexGrow}>{children}</div>
            </div>
        </div>
    );
}

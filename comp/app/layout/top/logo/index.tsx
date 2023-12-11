import blockUtil from "@block/blockUtil";
import Link from "next/link";
import { ReactNode } from "react";
import css from "./index.module.scss";

type Props = {
    children?: ReactNode;
};

export default function Comp({ children }: Props) {
    return (
        <>
            <Link className={blockUtil.merge(css.a, css.mobile)} href="/side">
                {children}
            </Link>
            <Link className={blockUtil.merge(css.a, css.pc)} href="/">
                {children}
            </Link>
        </>
    );
}

import blockUtil from "@block/blockUtil";
import Link from "next/link";
import { ReactNode } from "react";
import css from "comp/app/layout1/top/index.module.scss";

type Props = {
    children?: ReactNode;
};

export default function Comp({ children }: Props) {
    return (
        <>
            <nav className={css.nav}>
                <div className={css.cont}>
                    <div className={css.logo}>
                        <Link className={blockUtil.merge(css.a, css.mobile)} href="/side">
                            {children}
                        </Link>

                        <Link className={blockUtil.merge(css.a, css.pc)} href="/">
                            {children}
                        </Link>
                    </div>
                </div>
            </nav>
            <div className={css.padding} />
        </>
    );
}

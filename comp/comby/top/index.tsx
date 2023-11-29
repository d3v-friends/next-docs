import fn from "@comp/index";
import Link from "next/link";
import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

type Props = {
    title?: ReactNode;
    center?: ReactNode;
    children?: ReactNode;
};

const {
    css: { merge },
} = fn;

const comp = async ({ children, center, title }: Props): Promise<JSX.Element> => {
    return (
        <>
            <div className={css.cont}>
                <div className={merge(css.nav, css.widthFull)}>
                    <div className={merge(css.title, css.widthSidebar)}>
                        <Link href={"/"}>{title}</Link>
                    </div>
                    <div className={css.space}>{center}</div>
                    <div>{children}</div>
                </div>
            </div>

            <div className={css.boxMargin} />
        </>
    );
};

export default comp;

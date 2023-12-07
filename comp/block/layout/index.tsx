import Link from "next/link";
import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

type Props = {
    title?: ReactNode;
    children: ReactNode[];
};

const Comp = ({ title, children }: Props): JSX.Element => {
    if (children.length != 4) return <>invalid child length (=4): length={children.length}</>;
    const [top, side, content, footer] = children;
    return (
        <>
            <div className={css.contNav}>
                <div className={css.nav}>
                    <div className={css.title}>
                        <Link href={"/"}>{title}</Link>
                    </div>
                    <div className={css.navContent}>{top}</div>
                </div>
            </div>
            <div className={css.contContent}>
                <div className={css.side}>{side}</div>
                <div className={css.content}>{content}</div>
            </div>
            <div className={css.footer}>{footer}</div>
        </>
    );
};

export default Comp;

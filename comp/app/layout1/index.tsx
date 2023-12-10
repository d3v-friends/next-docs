import { ReactNode } from "react";
import Top from "./top";
import css from "./index.module.scss";

type Props = {
    top: ReactNode;
    side: ReactNode;
    children?: ReactNode;
};

export default function Comp({ children, top, side }: Props) {
    return (
        <div className={css.cont}>
            <Top>{top}</Top>
            <div className={css.content}>
                <div className={css.side}>{side}</div>
                <div className={css.children}>{children}</div>
            </div>
        </div>
    );
}

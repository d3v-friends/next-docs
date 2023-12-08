import { ReactNode, JSX } from "react";
import Top from "./top";
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
            <Top title={title}>{top}</Top>
            <div className={css.cont}>
                <div className={css.side}>{side}</div>
                <div className={css.content}>{content}</div>
            </div>
            <div className={css.footer}>{footer}</div>
        </>
    );
};

export default Comp;

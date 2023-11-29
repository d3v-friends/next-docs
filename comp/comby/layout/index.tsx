import fn from "@comp/index";
import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

type Props = {
    children: ReactNode[];
};

const comp = async ({ children }: Props): Promise<JSX.Element> => {
    if (children.length != 2) return <>invalid children length (=2): length={children.length}</>;

    return (
        <div className={css.cont}>
            <div className={fn.css.merge(css.widthSidebar)}>{children[0]}</div>
            <div className={fn.css.merge(css.widthContent)}>{children[1]}</div>
        </div>
    );
};

export default comp;

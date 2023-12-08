import cutil from "@cutil";
import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

const { merge } = cutil;
export type PArgs = {
    size?: 1 | 2 | 3;
    hover?: boolean;
    children?: ReactNode;
};

const Comp = async ({ children, size, hover }: PArgs): Promise<JSX.Element> => {
    size = size || 1;
    const hoverCss = hover ? "hover" : "";
    return <p className={merge(css.p, `p${size}`, hoverCss)}>{children}</p>;
};

export default Comp;

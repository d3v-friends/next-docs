import fnCss from "@pure/fnCss";
import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

interface Props {
    children?: ReactNode;
    className?: string;
}

const { merge } = fnCss;

const Comp = async ({ children, className }: Props): Promise<JSX.Element> => {
    className = className || "";
    return <p className={merge(css.comp, className)}>{children}</p>;
};

export default Comp;

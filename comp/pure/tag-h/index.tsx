import { ReactNode, JSX } from "react";
import fnCss from "@pure/fnCss";
import css from "./index.module.scss";

interface Props {
    size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    align?: "left" | "center" | "right";
    children?: ReactNode;
    className?: string;
}

const { merge } = fnCss;

const Comp = ({ children, size, className, align }: Props): JSX.Element => {
    className = className || "";
    align = align || "left";
    return (
        <div style={{ textAlign: align }} className={merge(css[size], className)}>
            {children}
        </div>
    );
};

export default Comp;

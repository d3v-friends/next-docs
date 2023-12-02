import merge from "../merge";
import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

interface Props {
    size: 1 | 2 | 3 | 4 | 5 | 6;
    align?: "left" | "center" | "right";
    color?: "primary" | "normal";
    children?: ReactNode;
    className?: string;
}

const Comp = ({ children, size, className, align, color }: Props): JSX.Element => {
    className = className || "";
    color = color || "normal";
    const textAlign = align || "left";
    const sizeCss = `h${size}`;
    switch (size) {
        case 1:
            return (
                <h1 style={{ textAlign }} className={merge(css[sizeCss], css[color], className, css.marginBottom)}>
                    {children}
                </h1>
            );
        case 2:
            return (
                <h2 style={{ textAlign }} className={merge(css[sizeCss], css[color], className, css.marginBottom)}>
                    {children}
                </h2>
            );
        case 3:
            return (
                <h3 style={{ textAlign }} className={merge(css[sizeCss], css[color], className, css.marginBottom)}>
                    {children}
                </h3>
            );
        case 4:
            return (
                <h4 style={{ textAlign }} className={merge(css[sizeCss], css[color], className, css.marginBottom)}>
                    {children}
                </h4>
            );
        case 5:
            return (
                <h5 style={{ textAlign }} className={merge(css[sizeCss], css[color], className, css.marginBottom)}>
                    {children}
                </h5>
            );
        case 6:
            return (
                <h6 style={{ textAlign }} className={merge(css[sizeCss], css[color], className, css.marginBottom)}>
                    {children}
                </h6>
            );
        default:
            return <>invalid h size: size={size}</>;
    }
};

export default Comp;

import cutil from "@cutil";
import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

interface Props {
    size: 1 | 2 | 3 | 4 | 5 | 6;
    align?: "left" | "center" | "right";
    color?: "primary" | "normal";
    children?: ReactNode;
    className?: string;
    padding?: {
        t?: number;
        b?: number;
        l?: number;
        r?: number;
    };
}

const { merge } = cutil;

export default function Comp({ children, size, className, align, color, padding }: Props): JSX.Element {
    className = className || "";
    color = color || "normal";
    padding = padding || {};
    padding.t = padding.t || 0;
    padding.b = padding.b || 0;
    padding.l = padding.l || 0;
    padding.r = padding.r || 0;
    const cssPadding = `${padding.t}px ${padding.r}px ${padding.b}px ${padding.l}px`;
    const textAlign = align || "left";
    const sizeCss = `h${size}`;
    const style = {
        textAlign,
        padding: cssPadding,
    };

    switch (size) {
        case 1:
            return (
                <h1 style={style} className={merge(css[sizeCss], css[color], className)}>
                    {children}
                </h1>
            );
        case 2:
            return (
                <h2 style={style} className={merge(css[sizeCss], css[color], className)}>
                    {children}
                </h2>
            );
        case 3:
            return (
                <h3 style={style} className={merge(css[sizeCss], css[color], className)}>
                    {children}
                </h3>
            );
        case 4:
            return (
                <h4 style={style} className={merge(css[sizeCss], css[color], className)}>
                    {children}
                </h4>
            );
        case 5:
            return (
                <h5 style={style} className={merge(css[sizeCss], css[color], className)}>
                    {children}
                </h5>
            );
        case 6:
            return (
                <h6 style={style} className={merge(css[sizeCss], css[color], className)}>
                    {children}
                </h6>
            );
        default:
            return <>invalid h size: size={size}</>;
    }
}

import cutil from "@cutil";
import { ReactNode, JSX, MouseEventHandler } from "react";
import css from "./index.module.scss";

interface Props {
    type?: "button" | "submit" | "reset";
    color?: "primary";
    style?: "fill" | "outline";
    ariaDisabled?: boolean;
    children?: ReactNode;
    className?: string;
    size?: 1 | 2 | 3;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Comp({ children, type, color, style, ariaDisabled, className, size, onClick }: Props): JSX.Element {
    type = type || "button";
    color = color || "primary";
    style = style || "fill";
    className = className || "";
    size = size || 1;

    return (
        <button
            onClick={onClick}
            aria-disabled={ariaDisabled}
            type={type}
            className={cutil.merge(css.button, css[color], css[style], css[`size${size}`], css.marginBottom, className)}>
            {children}
        </button>
    );
}

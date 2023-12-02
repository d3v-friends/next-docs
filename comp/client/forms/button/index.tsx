"use client";

import merge from "@tag/merge";
import { ReactNode, JSX } from "react";
import { useFormStatus } from "react-dom";
import css from "./index.module.scss";

interface Props {
    type?: "button" | "submit" | "reset";
    color?: "primary";
    style?: "fill" | "outline";
    children?: ReactNode;
}

const Comp = async ({ children, type, color, style }: Props): Promise<JSX.Element> => {
    type = type || "button";
    color = color || "primary";
    style = style || "fill";

    const { pending } = useFormStatus();
    return (
        <button type={type} className={merge(css.button, css[color], css[style], css.marginBottom)} aria-disabled={pending}>
            {children}
        </button>
    );
};

export default Comp;

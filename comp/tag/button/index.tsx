import merge from "../merge";
import { ReactNode, JSX } from "react";
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

    return (
        <button type={type} className={merge(css.button, css[color], css[style], css.marginBottom)}>
            {children}
        </button>
    );
};

export default Comp;

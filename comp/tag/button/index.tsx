import cutil from "@cutil";
import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

interface Props {
    type?: "button" | "submit" | "reset";
    color?: "primary";
    style?: "fill" | "outline";
    ariaDisabled?: boolean;
    children?: ReactNode;
}

const Comp = async ({ children, type, color, style, ariaDisabled }: Props): Promise<JSX.Element> => {
    type = type || "button";
    color = color || "primary";
    style = style || "fill";

    return (
        <button aria-disabled={ariaDisabled} type={type} className={cutil.merge(css.button, css[color], css[style], css.marginBottom)}>
            {children}
        </button>
    );
};

export default Comp;

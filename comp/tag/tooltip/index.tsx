import fnCss from "@fn/css";
import { ReactNode } from "react";
import css from "./index.module.scss";

interface Props {
    tooltip: string;
    children?: ReactNode;
    loc?: Location;
    className?: string;
}

type Location = "top" | "bottom" | "left" | "right";

export default function Comp({ children, tooltip, loc, className }: Props) {
    loc = loc || "bottom";
    className = className || "";

    return (
        <div className={css.cont}>
            <span className={className}>{children}</span>
            <div className={fnCss.merge(css.tooltip, css[loc])}>{tooltip}</div>
        </div>
    );
}

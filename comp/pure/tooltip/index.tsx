import merge from "@tag/merge";
import { ReactNode } from "react";

import css from "./index.module.scss";

interface Props {
    tooltip: string;
    children?: ReactNode;
    loc?: Location;
}

type Location = "top" | "bottom" | "left" | "right";

export default function Comp({ children, tooltip, loc }: Props) {
    const width = tooltip.length * 8;
    const marginLeft = -width / 2;
    loc = loc || "bottom";

    return (
        <div className={css.cont}>
            {children}
            <div className={merge(css.tooltip, css[loc])} style={{ width, marginLeft }}>
                {tooltip}
            </div>
        </div>
    );
}

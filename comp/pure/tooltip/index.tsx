import { ReactNode } from "react";
import fnCss from "@pure/fnCss";
import css from "comp/pure/tooltip/index.module.scss";

interface Props {
    tooltip: string;
    children?: ReactNode;
    loc?: Location;
}

type Location = "top" | "bottom" | "left" | "right";
const { merge } = fnCss;

export default function Comp({ children, tooltip, loc }: Props) {
    const width = tooltip.length * 8;
    const marginLeft = -width / 2;
    loc = loc || "bottom";

    const locCss = ((l: Location) => {
        switch (l) {
            case "top":
                return css.locTop;
            case "bottom":
                return css.locBottom;
            case "left":
                return css.locLeft;
            case "right":
                return css.locRight;
            default:
                return css.locBottom;
        }
    })(loc);

    return (
        <div className={css.cont}>
            {children}
            <div className={merge(css.tooltip, locCss)} style={{ width, marginLeft }}>
                {tooltip}
            </div>
        </div>
    );
}

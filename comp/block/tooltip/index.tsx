import blockUtil from "@block/blockUtil";
import { Location } from "@block/type";
import { ReactNode } from "react";
import css from "./index.module.scss";

type Props = {
    tooltip: string;
    loc?: Location;
    children?: ReactNode;
};

export default function Comp({ children, tooltip, loc }: Props) {
    loc = loc || "bottom";
    let style: any = {
        width: (tooltip.length + 2) * 13,
    };

    switch (loc) {
        case "bottom":
        case "top":
            style.left = `calc((100% - ${style.width}px)/2)`;
            break;
    }

    return (
        <div className={css.cont}>
            {children}
            <div style={style} className={blockUtil.merge(css.tooltip, css[loc])}>
                {tooltip}
            </div>
        </div>
    );
}

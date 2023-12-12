import { ReactNode } from "react";

type Props = {
    children: ReactNode,
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
}
export default function Comp({ left, right, top, bottom, children }: Props) {
    return <div style={{
        paddingTop: top || 0,
        paddingBottom: bottom || 0,
        paddingLeft: left || 0,
        paddingRight: right || 0,
    }}>{children}</div>;
}

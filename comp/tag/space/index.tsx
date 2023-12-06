import { JSX } from "react";

interface Props {
    type?: "margin" | "flexGrow";
    height?: number | string;
}

export default function Comp({ type, height }: Props): JSX.Element {
    type = type || "margin";
    let style: any;

    switch (type) {
        case "flexGrow":
            style = {
                flexGrow: 1,
            };
            break;
        case "margin":
            height = height || "20px";
            style = { height };
            break;
        default:
            return <>Space tag error: type={type}</>;
    }

    return <div style={style} />;
}

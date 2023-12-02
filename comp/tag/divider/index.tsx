import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

interface Props {
    children: ReactNode[];
    alignItems?: "center" | "flex-end" | "flex-start";
}

const Comp = async ({ children, alignItems }: Props): Promise<JSX.Element> => {
    if (children.length != 2) return <>invalid divider</>;
    const left = children[0];
    const right = children[1];
    alignItems = alignItems || "center";

    return (
        <div className={css.cont} style={{ alignItems }}>
            <div>{left}</div>
            <div className={css.space} />
            <div>{right}</div>
        </div>
    );
};

export default Comp;

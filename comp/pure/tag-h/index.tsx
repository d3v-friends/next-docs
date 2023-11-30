import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

interface Props {
    size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    children?: ReactNode;
}

const Comp = async ({ children, size }: Props): Promise<JSX.Element> => {
    return <div className={css[size]}>{children}</div>;
};

export default Comp;

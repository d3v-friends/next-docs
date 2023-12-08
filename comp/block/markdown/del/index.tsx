import { JSX, ReactNode } from "react";
import css from "./index.module.scss";

interface Props {
    children?: ReactNode;
}

export default function Comp({ children }: Props): JSX.Element {
    return <span className={css.cont}>{children}</span>;
}

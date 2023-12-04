import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

type Props = {
    children?: ReactNode;
};

export default function Comp({ children }: Props): JSX.Element {
    return <div className={css.cont}>{children}</div>;
}

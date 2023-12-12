import blockUtil from "@block/blockUtil";
import { ReactNode } from "react";
import css from "./index.module.scss";

type Props = {
    children?: ReactNode;
};

export default function Comp({ children }: Props) {
    return <li className={blockUtil.merge(css.li, "mb-100")}>{children}</li>;
}

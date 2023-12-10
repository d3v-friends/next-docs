import { ReactNode } from "react";
import css from "./index.module.scss";

type Props = {
    children?: ReactNode;
};

export default function Comp({ children }: Props) {
    return <ul>{children}</ul>;
}

"use server";

import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

interface Props {
    children: () => JSX.Element;
}

const Comp = ({ children }: Props): JSX.Element => {
    return children();
};

export default Comp;

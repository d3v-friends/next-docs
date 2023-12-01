import merge from "../merge";
import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

const Comp = async (): Promise<JSX.Element> => {
    return <div className={merge(css.hr)} />;
};

export default Comp;

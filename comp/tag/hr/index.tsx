import cutil from "@cutil";
import { JSX } from "react";
import css from "./index.module.scss";

const { merge } = cutil;
const Comp = async (): Promise<JSX.Element> => {
    return <div className={merge(css.hr)} />;
};

export default Comp;

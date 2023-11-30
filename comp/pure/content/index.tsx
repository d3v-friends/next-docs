import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

type Props = {
    children?: ReactNode;
};

const Comp = async ({ children }: Props): Promise<JSX.Element> => {
    return <div className={css.cont}>{children}</div>;
};

export default Comp;

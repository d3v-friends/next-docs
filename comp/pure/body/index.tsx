import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

type Props = {
    children?: ReactNode;
};

const comp = async ({ children }: Props): Promise<JSX.Element> => {
    return (
        <div className={css.cont}>
            <div className={css.widthFull}>{children}</div>
        </div>
    );
};

export default comp;

import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

type Props = {
    children: ReactNode[];
    space?: number;
};

const Comp = ({ children, space }: Props): JSX.Element => {
    space = space || 10;
    return (
        <div className={css.cont}>
            {children.map((v, i) => (
                <div className={css.item} key={i} style={{ paddingRight: space }}>
                    {v}
                </div>
            ))}
        </div>
    );
};

export default Comp;

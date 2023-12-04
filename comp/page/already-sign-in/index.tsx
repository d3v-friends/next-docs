import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

type Props = {
    children?: ReactNode;
};

const Comp = ({ children }: Props): JSX.Element => {
    return (
        <>
            <div>{children}</div>
        </>
    );
};

export default Comp;

import { ReactNode, JSX } from "react";

interface Props {
    on: boolean;
    children: JSX.Element;
}

const Comp = ({ on, children }: Props): JSX.Element => {
    return on ? children : <></>;
};

export default Comp;

import { JSX } from "react";

interface Props {
    on: boolean;
    children: JSX.Element;
}

const Comp = ({ children, on }: Props): JSX.Element | null => {
    return on ? children : null;
};

export default Comp;

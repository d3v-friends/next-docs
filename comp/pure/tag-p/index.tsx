import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

interface Props {
    children?: ReactNode;
}

const Comp = async ({ children }: Props): Promise<JSX.Element> => {
    return (
        <div>
            <h1>comp</h1>
        </div>
    );
};

export default Comp;

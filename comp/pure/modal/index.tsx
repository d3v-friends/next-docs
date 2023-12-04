import { ReactNode, JSX } from "react";
import css from "./index.module.scss";
import Header from "./header";

interface Props {
    children?: ReactNode;
    header?: ReactNode;
    onOff: () => void;
}

const Comp = ({ children, header, onOff }: Props): JSX.Element => {
    return (
        <div className={css.cont}>
            <div>
                <div className={css.modal}>
                    {header && <Header onOff={onOff}>{header}</Header>}
                    <div className={css.children}>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Comp;

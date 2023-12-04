import moment from "moment";
import { ReactNode, JSX } from "react";
import css from "./index.module.scss";
import Header from "./header";

interface Props {
    children?: ReactNode;
    header?: ReactNode;
    date?: Date;
    onOff: () => void;
}

const Comp = ({ children, header, onOff, date }: Props): JSX.Element => {
    date = date || new Date();
    return (
        <div className={css.cont}>
            <div>
                <div className={css.modal}>
                    {header && <Header onOff={onOff}>{header}</Header>}
                    <div className={css.children}>{children}</div>
                </div>
                <div className={css.date}>{moment(date).format("yy-MM-DD - h:ss a")}</div>
            </div>
        </div>
    );
};

export default Comp;

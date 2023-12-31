import blockUtil from "@block/blockUtil";
import { ReactNode } from "react";
import Header from "./header";
import css from "./index.module.scss";

type Props = {
    header?: ReactNode;
    children?: ReactNode;
    onClose?: Function;
};

export default function Comp({ children, header, onClose }: Props) {
    return (
        <div className={blockUtil.merge("backdrop")}>
            <div className={css.modal}>
                <Header onClose={onClose}>{header}</Header>
                <div className={css.content}>{children}</div>
            </div>
        </div>
    );
}

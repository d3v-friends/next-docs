"use client";

import OnOff from "@client/onOff";
import { ReactNode, JSX, useState } from "react";
import css from "./index.module.scss";
import Header from "./header";

interface Props {
    children?: ReactNode;
    header?: ReactNode;
    onClose?: Function;
}

const Comp = ({ children, onClose, header }: Props): JSX.Element => {
    const hasClose = !!onClose;

    return (
        <div className={css.cont}>
            <div>
                <OnOff on={hasClose}>
                    <Header onOff={onClose!}>{header}</Header>
                </OnOff>
                <div className={css.children}>{children}</div>
            </div>
        </div>
    );
};

export default Comp;

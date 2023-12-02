"use client";

import OnOff from "@client/onOff";
import { ReactNode, JSX, useState } from "react";
import css from "./index.module.scss";
import Header from "./header";

interface Props {
    children?: ReactNode;
    header?: ReactNode;
    onClose?: "true" | "false";
}

const Comp = ({ children, onClose, header }: Props): JSX.Element => {
    const [on, setOn] = useState(true);
    const hasClose = (onClose || "true") == "true";

    return (
        <OnOff on={on}>
            <div className={css.cont}>
                <div>
                    <OnOff on={hasClose}>
                        <Header onOff={() => setOn(false)}>{header}</Header>
                    </OnOff>
                    <div className={css.children}>{children}</div>
                </div>
            </div>
        </OnOff>
    );
};

export default Comp;

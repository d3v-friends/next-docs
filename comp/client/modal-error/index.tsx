"use client";

import OnOff from "@client/onOff";
import { ReactNode, JSX, useState, useEffect } from "react";
import css from "./index.module.scss";
import Header from "./header";

interface Props {
    value: any;
    children?: ReactNode;
    header?: ReactNode;
}

const Comp = ({ children, header, value }: Props): JSX.Element => {
    const [onShow, setOnShow] = useState(false);

    useEffect(() => {
        setOnShow(!!value);
    }, [value]);

    return (
        <>
            {onShow && (
                <div className={css.cont}>
                    <div>
                        <OnOff on={onShow}>
                            <Header onOff={() => setOnShow(false)}>{header}</Header>
                        </OnOff>
                        <div className={css.children}>{children}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Comp;

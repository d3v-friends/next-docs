"use client";

import { JSX, ReactNode, useEffect, useState } from "react";
import css from "./index.module.scss";

interface Props {
    children: {
        message: ReactNode;
        regAt: Date;
    };
}

export default function Comp({ children }: Props): JSX.Element {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, [children.regAt]);

    return <div className={css.cont}>{children.message}</div>;
}

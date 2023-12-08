"use client";

import { ReactNode, JSX, useState } from "react";
import Modal from "@block/modal";

type Props = {
    value: string;
    children: ReactNode;
};

export default function ({ value, children }: Props): JSX.Element {
    const onClick = () => {
        window.navigator.clipboard.writeText(value).catch(() => console.log("fail copy to clipboard"));
    };

    return (
        <>
            <div onClick={onClick}>{children}</div>
        </>
    );
}

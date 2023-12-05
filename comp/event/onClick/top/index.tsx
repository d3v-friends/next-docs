"use client";
import { JSX, MouseEventHandler } from "react";

type Props = {
    className: string;
    children?: JSX.Element;
};

export default function Comp({ children, className }: Props): JSX.Element {
    const onClick: MouseEventHandler<HTMLDivElement> = ev => {
        if (typeof window === "undefined") return;
        if (!window) return;
        window.scrollTo(0, 0);
    };

    return (
        <div className={className} onClick={onClick}>
            {children}
        </div>
    );
}

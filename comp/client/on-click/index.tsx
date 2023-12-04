"use client";
import { ReactNode, JSX } from "react";

interface Props {
    onClick: Function;
    children: ReactNode;
}

export default function Comp({ children, onClick }: Props): JSX.Element {
    return <div onClick={() => onClick()}>{children}</div>;
}

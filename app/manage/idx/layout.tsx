"use server";
import Tab from "@app/manageTab";
import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

export default async function Comp({ children }: Props) {
    return (
        <>
            <Tab activeName="index" />
            {children}
        </>
    );
}

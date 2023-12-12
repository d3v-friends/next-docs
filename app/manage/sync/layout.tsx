"use server";
import Tab from "@app/manageTab";
import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export default async function Comp({ children }: Props) {
    return (
        <>
            <Tab activeName="sync" />
            {children}
        </>
    );
}

"use server";
import { ReactNode } from "react";
import Tab from "@app/manageTab";

type Props = {
    children?: ReactNode;
};

export default async function Comp({ children }: Props) {
    return (
        <>
            <Tab activeName="git" />
            {children}
        </>
    );
}

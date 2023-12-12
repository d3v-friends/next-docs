"use server";
import { getSession } from "@fn/action";
import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

export default async function Comp({ children }: Props) {
    const session = await getSession();
    if (session.account.readable !== "admin") {
        return <>not found page</>;
    }

    return <>{children}</>;
}

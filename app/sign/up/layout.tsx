"use server";
import { getSession } from "@fn/action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

export default async function Comp({ children }: Props) {
    const session = await getSession();
    if (session.isSignIn) redirect("/");
    return <>{children}</>;
}

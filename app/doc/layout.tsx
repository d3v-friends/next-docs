"use server";
import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

export default async function Comp({ children }: Props) {
    return <>{children}</>;
}

"use server";
import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
    params: {};
    searchParams: {};
};

export default async function Comp({ children }: Props) {
    return <>{children}</>;
}

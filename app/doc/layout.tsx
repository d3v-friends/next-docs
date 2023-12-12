"use server";
import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export default async function Comp({ children }: Props) {
    return <>{children}</>;
}

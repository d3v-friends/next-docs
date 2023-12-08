"use server";
import { JSX } from "react";

type Props = {
    children?: JSX.Element;
};

export default async function Layout({ children }: Props) {
    return <>{children}</>;
}

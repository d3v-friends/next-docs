"use server";
import EventBlock from "@event/index";
import { JSX } from "react";

interface Props {
    children?: JSX.Element;
    params: {};
    searchParams: {};
}

const { OnPc, OnMobile } = EventBlock;

export default async function Layout({ children }: Props) {
    return (
        <>
            <OnPc>not found</OnPc>
            <OnMobile>{children}</OnMobile>
        </>
    );
}

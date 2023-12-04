import Client from "@client";
import { JSX } from "react";

const { SignOut } = Client;
export default function Page(): JSX.Element {
    return (
        <>
            <SignOut></SignOut>
        </>
    );
}

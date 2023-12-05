import { JSX } from "react";
import fn from "@fn";

const {
    sign: { getSession },
} = fn;

export default async function Page(): Promise<JSX.Element> {
    const session = await getSession();
    const now = new Date();
    return (
        <>
            <p>{now.toISOString()}</p>
        </>
    );
}

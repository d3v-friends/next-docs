"use server";

import { getSession } from "@action/sign";

type Props = {};

export default async function Page() {
    const session = await getSession();
    const now = new Date();
    return (
        <>
            <p>{now.toISOString()}</p>
        </>
    );
}

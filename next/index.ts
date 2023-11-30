import { cookies } from "next/headers";

namespace Next {
    const keySession = "session";
    type Readable = "admin" | "maintainer" | "subscriber" | "all";
    const ReadableAll: Readable[] = ["admin", "maintainer", "subscriber", "all"];

    // account
    type Account = {
        id: string;
        username: string;
        auth: { [key: string]: Verifier };
        create: Date;
        update: Date;
    };




    type Verifier = {
        key: string;
        value: string;
        mode: VerifierMode;
    };

    type VerifierKey = "password" | "otp";
    type VerifierMode = "otp" | "compare";

    type Session = {
        username: string;
        readable: Readable;
        create: Date;
    };

    export const getSession = async () => {
        const c = cookies();
        const session = c.get(keySession);
        if (!session) return {};
    };
}

export default Next;

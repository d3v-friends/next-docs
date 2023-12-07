import { v4 } from "uuid";

export type UUID = string;

export function NewUUID(): UUID {
    return v4();
}

export type Readable = "admin" | "maintainer" | "subscriber" | "all";
export const ReadableAll: Readable[] = ["admin", "maintainer", "subscriber", "all"];

export function GetReadableIndex(v: Readable): number {
    switch (v) {
        case "admin":
            return 0;
        case "maintainer":
            return 1;
        case "subscriber":
            return 2;
        default:
            return 3;
    }
}

export type Account = {
    id: UUID;
    isActivate: boolean;
    username: string;
    auth: {
        password: {
            salt: string;
            saltedPasswd: string;
        };
    };
    readable: Readable;
};

export type SessionToken = string;
export type ActionResult<T> = {
    code: ActionResultCode;
    resAt: Date;
    value?: T;
    message?: string;
};

export type ActionResultCode = number;
type ARCodeKey = "success" | "error";
export const ARCode: Record<ARCodeKey, ActionResultCode> = {
    success: 200,
    error: 500,
};

export async function FnFormAction<T>(
    formData: FormData,
    fn: (data: FormData) => Promise<
        Nullable<
            Partial<{
                message: string;
                value: T;
            }>
        >
    >,
): Promise<ActionResult<T>> {
    try {
        let res = await fn(formData);
        return {
            code: 200,
            message: res?.message,
            value: res?.value,
            resAt: (() => new Date())(),
        };
    } catch (err) {
        let message = JSON.stringify(err);
        if (err instanceof Error) {
            message = err.message;
        }

        return {
            code: 500,
            message,
            resAt: (() => new Date())(),
        };
    }
}

export function getFormString(form: FormData, key: string): string {
    return (form.get(key) || "") as string;
}

export function getForm(form: FormData, ...names: string[]): string[] {
    const ls: string[] = [];

    for (const name of names) {
        const v = form.get(name);
        if (!v) {
            ls.push("");
            continue;
        }
        if (typeof v !== "string") {
            ls.push("");
            continue;
        }
        ls.push(v);
    }

    return ls;
}

export function testRegex(v: string[], t: RegExp[]): boolean {
    if (v.length != t.length) throw new Error("regex is not available");

    for (let i = 0; i < v.length; i++) {
        if (t[i].test(v[i])) {
            return false;
        }
    }

    return true;
}

export type TokenPayload = {
    sessionId: UUID;
    username: string;
    signAt: Date;
};

export const InitAction = <DATA>(): ActionResult<DATA> => ({
    code: 200,
    resAt: new Date(),
});

export const FormKey = {
    sign: {
        username: "username",
        password: "password",
        confirm: "confirm",
    },
};

export type Nullable<T> = T | null | undefined;

export type MD = {
    path: string;
    content: string;
    info: {
        [key: string]: string;
    };
};

export const MDInfoPrefix = "@@@";

export type IndexTree = {
    path: string;
    basename: string;
    fileList: {
        path: string;
        alias: string;
        tags: string[];
        readable: Readable[];
    }[];
    children: {
        [key: string]: IndexTree;
    };
};

export type InfoKey = "alias" | "create" | "update" | "readable" | "tags";

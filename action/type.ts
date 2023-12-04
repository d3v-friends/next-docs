import { v4 } from "uuid";

export type UUID = string;

export function NewUUID(): UUID {
    return v4();
}

export type Readable = "admin" | "maintainer" | "subscriber" | "all";

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

export async function FnFormAction<T>(formData: FormData, fn: (data: FormData) => Promise<T>): Promise<ActionResult<T>> {
    try {
        let res = await fn(formData);
        return {
            code: 200,
            value: res,
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

export type TokenPayload = {
    sessionId: UUID;
    username: string;
    signAt: Date;
};

export const InitFormActionRes: ActionResult<any> = {
    code: 200,
    resAt: new Date(),
};
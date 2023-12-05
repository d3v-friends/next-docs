"use server";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { v4 } from "uuid";
import fnEnv from "./env";
import fnJson from "./json";
import fnPath from "./path";

import { Account, SessionToken, TokenPayload, FnFormAction, getFormString, NewUUID } from "./type";

const getSecret = () => fnEnv.string("JWT_SECRET", "123e4567-e89b-12d3-a456-426614174000");
const keySession = "session";
const regex = {
    username: new RegExp("^[a-z][a-z|0-9]{7,20}$"),
    password: new RegExp(`^[a-zA-Z0-9!@#$%^&*()_+|~{}\\\[\\];':",\.\/<>?\`]{8,30}$`),
};

type SignData = {
    username: string;
    password: string;
};

function getSignData(form: FormData): SignData {
    const username = getFormString(form, "username");
    if (!regex.username.test(username)) throw new Error("invalid username");

    const password = getFormString(form, "password");
    if (!regex.password.test(password)) throw new Error("invalid password");

    return {
        username,
        password,
    };
}

type ISalting = {
    salt: string;
    password: string;
};

function salting({ salt, password }: ISalting): string {
    const encode = "base64";
    const bSalt = Buffer.from(salt, encode);
    const bValue = Buffer.from(password, encode);
    const res = crypto.pbkdf2Sync(bValue, bSalt, 10000, 64, "sha512");
    return res.toString(encode);
}

const createToken = (payload: TokenPayload): SessionToken => {
    return jsonwebtoken.sign(payload, getSecret(), {
        algorithm: "HS512",
    });
};

type VerifyToken = {
    isVerified: boolean;
    payload: TokenPayload;
};

const NoVerifyToken: VerifyToken = {
    isVerified: false,
    payload: {
        sessionId: "",
        username: "",
        signAt: new Date(),
    },
};

function verifyToken(token: string): VerifyToken {
    if (!token) return NoVerifyToken;

    const res = jsonwebtoken.verify(token, getSecret()) as TokenPayload;

    if (!res) return NoVerifyToken;

    return {
        isVerified: true,
        payload: res,
    };
}

/* -------------------------------------------------------------------------------------------------- */
// utils

export type SessionStatus = {
    isSignIn: boolean;
    account: Account;
};

const NoSessionStatus: SessionStatus = {
    isSignIn: false,
    account: {
        id: "",
        isActivate: false,
        username: "",
        auth: {
            password: {
                salt: "",
                saltedPasswd: "",
            },
        },
        readable: "all",
    },
};

export async function GetSession(): Promise<SessionStatus> {
    const token = cookies().get(keySession);

    if (!token) return NoSessionStatus;

    const { isVerified, payload } = verifyToken(token.value);

    if (!isVerified) {
        return NoSessionStatus;
    }

    if (!payload) return NoSessionStatus;

    const { username } = payload;
    const fp = `/config/account/${username}.json`;

    if (!fnJson.isExist(fp)) {
        return NoSessionStatus;
    }

    const account = await fnJson.read<Account>(fp);

    return {
        isSignIn: true,
        account,
    };
}

/* -------------------------------------------------------------------------------------------------- */

// actions
export async function SignOutAction(_: any, form: FormData) {
    return FnFormAction(form, async data => {
        cookies().delete(keySession);
        revalidatePath("/");
        redirect("/");
    });
}

export async function SignUpAction(_: any, form: FormData) {
    return FnFormAction(form, async data => {
        const { username, password } = getSignData(data);

        const fp = `/config/account/${username}.json`;
        if (fnPath.isExist(fp)) throw new Error("duplicated username");

        const confirm = getFormString(data, "confirm");
        if (password !== confirm) throw new Error("not matched password and confirm");

        const salt = crypto.randomBytes(64).toString("base64");
        const saltedPasswd = salting({ salt, password });

        const account: Account = {
            id: v4(),
            isActivate: true,
            readable: "subscriber",
            username,
            auth: {
                password: {
                    salt,
                    saltedPasswd,
                },
            },
        };

        await fnJson.write(fp, account);

        redirect("/");
    });
}

export async function SignInAction(_: any, form: FormData) {
    return FnFormAction(form, async data => {
        const { username, password } = getSignData(form);
        const account = await fnJson.read<Account>(`/config/account/${username}.json`);

        if (!account.isActivate) throw new Error("rejected sign up");

        const saltedPasswd = salting({
            salt: account.auth.password.salt,
            password,
        });

        if (saltedPasswd !== account.auth.password.saltedPasswd) throw new Error("invalid sign data");

        const payload: TokenPayload = {
            username,
            sessionId: NewUUID(),
            signAt: new Date(),
        };

        cookies().set(keySession, createToken(payload));
        revalidatePath("*");
        redirect("/");
    });
}

const fnSign = {
    getSession: GetSession,
    inAction: SignInAction,
    upAction: SignUpAction,
    outAction: SignOutAction,
};

export default fnSign;

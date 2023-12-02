"use server";

import fnEnv from "./env";
import fnPath from "./path";
import fnJson from "./json";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { v4 } from "uuid";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";

type UUID = string;
type Message = string | void;
type Token = string;
type SignValue = {
    username: string;
    password: string;
};

type Account = {
    id: UUID;
    username: string;
    auth: {
        password: {
            salt: string;
            saltedPasswd: string;
        };
    };
};

type Session = {
    isActivate: boolean;
    signIn: Date;
};

type TokenPayload = {
    username: string;
    signAt: Date;
};

const getJwtSecret = () => fnEnv.string("JWT_SECRET", "123e4567-e89b-12d3-a456-426614174000");
const keySession = "session";
const regexUsername = new RegExp("^[a-z][a-z|0-9]{7,20}$");
const regexPassword = new RegExp(`^[a-zA-Z0-9!@#$%^&*()_+|~{}\\\[\\];':",\.\/<>?\`]{8,30}$`);

const signIn = async (form: FormData): Promise<Message> => {
    const { username, password } = getData(form);
    const account = await fnJson.read<Account>(`/account/${username}.json`);

    const { salt, saltedPasswd } = account.auth.password;
    const inputPasswd = salting({ salt, password });
    if (saltedPasswd !== inputPasswd) throw new Error("rejected sign in");

    const session = createToken({
        username,
        signAt: new Date(),
    });

    cookies().set(keySession, session, {
        sameSite: true,
        secure: true,
        httpOnly: true,
    });

    return revalidatePath("/");
};

const signOut = async (): Promise<Message> => {
    cookies().delete(keySession);
    return revalidatePath("/");
};

const signUp = async (form: FormData): Promise<Message> => {
    const { username, password } = getData(form);
    const fp = `/account/${username}.json`;
    if (fnPath.isExist(fp)) throw new Error("duplicated username");

    const salt = crypto.randomBytes(64).toString("base64");
    const saltedPasswd = salting({ salt, password });

    const account: Account = {
        id: v4(),
        username,
        auth: {
            password: {
                salt,
                saltedPasswd,
            },
        },
    };

    await fnJson.write(fp, account);
    return revalidatePath("/");
};

const createToken = (payload: TokenPayload): Token => {
    return jsonwebtoken.sign(payload, getJwtSecret(), {
        algorithm: "HS512",
    });
};

const verify = async (): Promise<Account> => {
    const c = cookies().get(keySession);
    if (!c) throw new Error("not found session");

    const { username } = jsonwebtoken.verify(c.value, getJwtSecret()) as any;
    if (!username) {
        cookies().delete(keySession);
        throw new Error("invalid session");
    }

    return fnJson.read<Account>(`/account/${username}.json`);
};

const salting = ({ salt, password }: { salt: string; password: string }): string => {
    const encode = "base64";
    const bSalt = Buffer.from(salt, encode);
    const bValue = Buffer.from(password, encode);
    const res = crypto.pbkdf2Sync(bValue, bSalt, 10000, 64, "sha512");
    return res.toString(encode);
};

const getData = (form: FormData): SignValue => {
    const username = (form.get("username") || "") as string;
    if (!regexUsername.test(username)) throw new Error("invalid username");

    const password = (form.get("password") || "") as string;
    if (!regexPassword.test(password)) throw new Error("invalid password");

    return {
        username,
        password,
    };
};

const fnSign = {
    in: signIn,
    out: signOut,
    up: signUp,
    verify,
};

export default fnSign;

import crypto from "crypto";
import fs from "fs";
import jsonwebtoken from "jsonwebtoken";
import { v4 } from "uuid";
import fnEnv from "./env";
import fnJson from "./json";
import fnDir from "./dir";
import { Account, SessionToken, TokenPayload, NewUUID } from "./type";

const getSecret = () => fnEnv.string("JWT_SECRET", "123e4567-e89b-12d3-a456-426614174000");

const getUserFilepath = (username: string) => fnDir.getAbsolutePath("config", `/account/${username}.json`);

type Token = string;

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

const signVerify = async (token: string): Promise<SessionStatus> => {
    if (!token) return NoSessionStatus;

    const { isVerified, payload } = verifyToken(token);

    if (!isVerified) {
        return NoSessionStatus;
    }

    if (!payload) return NoSessionStatus;

    const { username } = payload;
    const fp = getUserFilepath(username);

    if (!fnJson.isExist(fp)) {
        return NoSessionStatus;
    }

    const account = await fnJson.read<Account>(fp);

    return {
        isSignIn: true,
        account,
    };
};

type SignUpArgs = {
    username: string;
    password: string;
};

const signUp = async ({ username, password }: SignUpArgs): Promise<Account> => {
    const fp = getUserFilepath(username);
    if (fs.existsSync(fp)) {
        throw new Error("duplicated username");
    }

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

    return account;
};

type SignInArgs = {
    username: string;
    password: string;
};

const signIn = async ({ username, password }: SignInArgs): Promise<Token> => {
    const fp = getUserFilepath(username);

    if (!fs.existsSync(fp)) throw new Error("not found account");

    const account = await fnJson.read<Account>(getUserFilepath(username));
    if (!account.isActivate) {
        throw new Error("rejected sign up");
    }

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

    return createToken(payload);
};

const fnSign = {
    signIn,
    signUp,
    signVerify,
};

export default fnSign;

"use server";
import fnAct from "@fn/act";
import fnConfig, { Config } from "@fn/config";
import fnGit from "@fn/git";
import fnMD from "@fn/md";
import regexp from "@fn/regexp";
import { getForm, FormKey, testRegex, MD } from "@fn/type";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import fnSign, { SessionStatus } from "./sign";

const cookie = {
    session: "session",
};

export async function signOutAction(_: any, form: FormData) {
    return fnAct.wrapAction(form, async data => {
        cookies().delete(cookie.session);
        revalidatePath("/");
        return "/sign/in";
    });
}

export async function signInAction(_: any, form: FormData) {
    return fnAct.wrapAction(form, async data => {
        const { sign } = FormKey;
        const [username, password] = getForm(data, sign.username, sign.password);
        if (!regexp.username.test(username)) {
            revalidateTag(FormKey.sign.username);
            throw new Error("invalid username");
        }

        if (!regexp.password.test(password)) {
            revalidateTag(FormKey.sign.password);
            throw new Error("invalid password");
        }

        const token = await fnSign.signIn({ username, password });
        cookies().set(cookie.session, token);
        return "/";
    });
}

export async function signUpAction(_: any, form: FormData) {
    return fnAct.wrapAction(form, async data => {
        const [username, password, confirm] = getForm(data, FormKey.sign.username, FormKey.sign.password, FormKey.sign.confirm);

        if (!regexp.username.test(username)) {
            revalidateTag(FormKey.sign.username);
            throw new Error("invalid username");
        }

        if (!regexp.password.test(password)) {
            revalidateTag(FormKey.sign.password);
            throw new Error("invalid password");
        }

        if (password !== confirm) {
            revalidateTag(FormKey.sign.password);
            revalidateTag(FormKey.sign.confirm);
            throw new Error("password and confirm is not matched");
        }

        await fnSign.signUp({
            username,
            password,
        });

        return "/sign/in";
    });
}

export async function resetIndexAction(_: any, form: FormData) {
    return fnAct.wrapAction(form, async _ => {
        revalidatePath(".", "page");
        await fnMD.idx.create();
        return {
            message: "success",
        };
    });
}

export async function gitInitAction(_: any, form: FormData) {
    return fnAct.wrapAction(form, async data => {
        throw new Error("not impl");
    });
}

export async function getSession(): Promise<SessionStatus> {
    const c = cookies().get(cookie.session);
    let token = "";
    if (c) token = c.value;
    return fnSign.signVerify(token);
}

export async function readMD(fp: string): Promise<MD> {
    return fnMD.reader.read(fp);
}

export async function getConfig(): Promise<Config> {
    return fnConfig.read();
}

export async function initGitAction(_: any, form: FormData) {
    return fnAct.wrapAction(form, async data => {
        const { git } = FormKey;
        const [url, key, username, email] = getForm(data, git.url, git.key, git.username, git.email);

        if (!regexp.gitRepo.test(url)) {
            revalidateTag(git.url);
            throw new Error("invalid url");
        }

        if (!regexp.gitAccessKey.test(key)) {
            revalidateTag(git.key);
            throw new Error("invalid access key");
        }

        if (!regexp.gitUsername.test(username)) {
            revalidateTag(git.username);
            throw new Error("invalid username");
        }

        if (!regexp.email.test(email)) {
            revalidateTag(git.email);
            throw new Error("invalid email");
        }

        await fnGit.init({ url, key, username, email });

        return {
            message: "success",
        };
    });
}

export async function syncGitAction(_: any, form: FormData) {
    return fnAct.wrapAction(form, async data => {
        await fnGit.sync();
        await fnMD.idx.create();
        return {
            message: "success",
        };
    });
}

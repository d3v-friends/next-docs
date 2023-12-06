"use server";
import fnConfig, { Config } from "@fn/config";
import fnMD, { MD } from "@fn/md";
import { FnFormAction, getForm, FormKey, testRegex } from "@fn/type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import fnSign, { SessionStatus } from "./sign";

const cookie = {
    session: "session",
};

export async function signInAction(_: any, form: FormData) {
    return FnFormAction(form, async data => {
        const [username, password] = getForm(data, FormKey.sign.username, FormKey.sign.password);
        if (!testRegex([username, password], [fnSign.regex.username, fnSign.regex.password])) {
            revalidateTag(FormKey.sign.username);
            revalidateTag(FormKey.sign.password);
        }

        const token = await fnSign.signIn({ username, password });
        cookies().set(cookie.session, token);
        redirect("/");
    });
}

export async function signUpAction(_: any, form: FormData) {
    return FnFormAction(form, async data => {
        const [username, password, confirm] = getForm(data, FormKey.sign.username, FormKey.sign.password, FormKey.sign.confirm);
        if (!testRegex([username, password], [fnSign.regex.username, fnSign.regex.password])) {
            revalidateTag(FormKey.sign.username);
            revalidateTag(FormKey.sign.password);
            revalidateTag(FormKey.sign.confirm);
            throw new Error("invalid input data");
        }

        if (password !== confirm) {
            revalidateTag(FormKey.sign.username);
            revalidateTag(FormKey.sign.password);
            revalidateTag(FormKey.sign.confirm);
            throw new Error("password and confirm is not matched");
        }

        await fnSign.signUp({
            username,
            password,
            confirm,
        });
        redirect("/sign/in");
    });
}

export async function getSession(): Promise<SessionStatus> {
    const c = cookies().get(cookie.session);
    let token = "";
    if (c) token = c.value;
    return fnSign.signVerify(token);
}

export async function readMD(fp: string): Promise<MD> {
    return fnMD.read(fp);
}

export async function getConfig(): Promise<Config> {
    return fnConfig.read();
}

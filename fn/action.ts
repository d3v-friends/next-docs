"use server";
import fnAct from "@fn/act";
import fnConfig, { Config } from "@fn/config";
import fnMD from "@fn/md";
import regexp from "@fn/regexp";
import { getForm, FormKey, testRegex, MD } from "@fn/type";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import fnSign, { SessionStatus } from "./sign";

const cookie = {
    session: "session",
};

export async function signInAction(_: any, form: FormData) {
    return fnAct.wrapAction(form, async data => {
        const [username, password] = getForm(data, FormKey.sign.username, FormKey.sign.password);
        if (!testRegex([username, password], [regexp.username, regexp.password])) {
            revalidateTag(FormKey.sign.username);
            revalidateTag(FormKey.sign.password);
        }

        const token = await fnSign.signIn({ username, password });
        cookies().set(cookie.session, token);
        redirect("/");
    });
}

export async function signUpAction(_: any, form: FormData) {
    return fnAct.wrapAction(form, async data => {
        const [username, password, confirm] = getForm(data, FormKey.sign.username, FormKey.sign.password, FormKey.sign.confirm);
        console.log(username, password, confirm);

        if (!testRegex([username, password], [regexp.username, regexp.password])) {
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

        return () => {
            redirect("/sign/in");
        };
    });
}

export async function resetIndexAction(_: any, form: FormData) {
    return fnAct.wrapAction(form, async _ => {
        revalidatePath(".", "page");
        await fnMD.idx.create();
        return;
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

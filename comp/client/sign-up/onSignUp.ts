"use server";

import fnAction from "@fnServer/action";
import fnSign from "@fnServer/sign";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const {
    up,
    form: { getSignData },
    regex,
} = fnSign;

export default async function OnAction(_: any, form: FormData) {
    debugger;

    try {
        const username = form.get("username") as string;
        if (regex.username.test(username)) return revalidateTag("username");

        const password = form.get("password") as string;
        if (regex.password.test(password)) return revalidateTag("password");
        await up({ username, password });
        return redirect("/");
    } catch (e) {
        return JSON.stringify(e);
    }
}

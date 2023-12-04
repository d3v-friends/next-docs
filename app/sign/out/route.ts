import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    cookies().delete("session");
    redirect("/sign/in", RedirectType.replace);
}

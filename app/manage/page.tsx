"use server";
import { redirect } from "next/navigation";

export default async function Comp() {
    redirect("/manage/idx");
}

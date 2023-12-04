import { getSession } from "@action/sign";
import { redirect } from "next/navigation";
import { JSX } from "react";

type Props = {
    children?: JSX.Element;
};

export default async function Layout({ children }: Props) {
    const session = await getSession();
    if (session.isSignIn) return <>{children}</>;
    redirect("/");
}

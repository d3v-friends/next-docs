import { getSession } from "@fn/action";
import { redirect } from "next/navigation";
import { JSX, ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export default async function Layout({ children }: Props): Promise<JSX.Element> {
    const session = await getSession();
    if (session.isSignIn) return redirect("/");
    return <>{children}</>;
}

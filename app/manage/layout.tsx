import { getSession } from "@fn/action";
import { ReactNode, JSX } from "react";

interface Props {
    children?: ReactNode;
}

export default async function Layout({ children }: Props): Promise<JSX.Element> {
    const session = await getSession();
    if (session.account.readable !== "admin") return <>no has permission</>;
    return <>{children}</>;
}

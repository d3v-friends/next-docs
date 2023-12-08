import { getConfig } from "@fn/action";
import { JSX, ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export default async function Layout({ children }: Props): Promise<JSX.Element> {
    const config = await getConfig();
    if (!config.signUp) {
        return <>Sign up is not service. now</>;
    }

    return <>{children}</>;
}

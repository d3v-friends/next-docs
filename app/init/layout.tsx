"use server";
import fnConfig from "@fn/config";
import { JSX } from "react";

type Props = {
    children?: JSX.Element;
};

export default async function Layout({ children }: Props) {
    const config = await fnConfig.read();
    if (config.git) {
        return <>already init. if you want to reset project, visit /manage with admin account.</>;
    }
    return <>{children}</>;
}

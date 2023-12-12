import fnMeta from "@fn/meta";
import { ReactNode } from "react";
import Layout from "@app/layout";
import "@scss/global.scss";

interface Props {
    children?: ReactNode;
}

export default async function Comp({ children }: Props) {
    return (
        <html lang="ko">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body>
                <Layout logo={fnMeta.getTitle()}>{children}</Layout>
            </body>
        </html>
    );
}

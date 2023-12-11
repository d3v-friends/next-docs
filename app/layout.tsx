import { ReactNode } from "react";
import Layout from "@app/layout";
import "@scss/global.scss";

type Props = {
    children?: ReactNode;
};

export default async function Comp({ children }: Props) {
    return (
        <html lang="ko">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body>
                <Layout logo={"next-dev"}>{children}</Layout>
            </body>
        </html>
    );
}

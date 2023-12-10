import { ReactNode } from "react";
import Layout from "@app/layout1";
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
                <Layout top={"top"} side={"side"}>
                    {children}
                </Layout>
            </body>
        </html>
    );
}

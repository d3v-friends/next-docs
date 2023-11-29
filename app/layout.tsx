import type {Metadata} from "next";
import {ReactNode} from "react";

export const metadata: Metadata = {
    title: "next-docs",
    description: "index.html",
};

type Props = {
    children?: ReactNode;
    params?: {
        slug?: string[],
    }
}

export default async function Layout({children}: Props) {
    return (
        <html lang="ko">
        <head>
            <link rel="icon" href="/favicon.icon" sizes="any"/>
        </head>
        <body>
        {children}
        </body>
        </html>
    );
}

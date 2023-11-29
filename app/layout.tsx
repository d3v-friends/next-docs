import Top from "@comby/top";
import Breadcrumb from "@pure/breadcrumb";
import moment from "moment";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Body from "@pure/body";
import Footer from "@pure/footer";
import css from "@comp/index.module.scss";
import "@comp/global.css";

export const metadata: Metadata = {
    title: "next-docs",
    description: "index.html",
};

type Props = {
    children?: ReactNode;
    params?: {
        slug?: string[];
    };
};

export default async function Layout({ children }: Props) {
    return (
        <html lang="ko">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={css.body}>
                <Body>
                    <Top title={"next-docs"}>
                        <div>signIn</div>
                    </Top>
                    {children}
                    <Footer since={moment("1987-09-24").toDate()} name={"Ciao Lee"} />
                </Body>
            </body>
        </html>
    );
}

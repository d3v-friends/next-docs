import Top from "@app/top";
import Side from "@app/side";
import Footer from "@block/footer";
import Body from "@block/layout";
import type { Metadata } from "next";
import { ReactNode, JSX } from "react";
import css from "@style/body.module.scss";
import "@css";

export const metadata: Metadata = {
    title: "next-docs",
    description: "index.html",
};

type Props = {
    children?: ReactNode;
};

export default async function Layout({ children }: Props): Promise<JSX.Element> {
    return (
        <html lang="ko">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={css.body}>
                <Body>
                    <Top />
                    <Side />
                    <>{children}</>
                    <>
                        <Footer name="Ciao Lee" since="1987-09-24" />
                    </>
                </Body>
            </body>
        </html>
    );
}

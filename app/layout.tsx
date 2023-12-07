import GoTop from "@app/goTop";
import Top from "@app/top";
import Side from "@app/side";
import Footer from "@block/footer";
import Body from "@block/layout";
import fnEnv from "@fn/env";
import { getSession } from "@fn/action";
import Tags from "@tag/index";
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

const { Debug } = Tags;

export default async function Layout({ children }: Props): Promise<JSX.Element> {
    const debugMode = fnEnv.boolean("DEBUG_MODE", false);
    const session = await getSession();


    return (
        <html lang="ko">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={css.body}>
                <Body title={"next-docs"}>
                    <Top />
                    <Side />
                    <>{children}</>
                    <>
                        <Footer name="Ciao Lee" since="1987-09-24" />
                        <GoTop />
                        {debugMode && (
                            <Debug
                                data={[
                                    { key: "session", value: session.isSignIn ? "signIn" : "signOut" },
                                    { key: "readable", value: session.account.readable },
                                    { key: "username", value: session.account.username },
                                ]}
                            />
                        )}
                    </>
                </Body>
            </body>
        </html>
    );
}

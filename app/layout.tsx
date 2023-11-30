import fn from "@comp/index";
import type { Metadata } from "next";
import { ReactNode, JSX } from "react";
import TopButton from "@client/onTop";
import Footer from "@pure/footer";
import Body from "@pure/body";
import Top from "@comby/top";

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

const Layout = async ({ children }: Props): Promise<JSX.Element> => {
    const fileList = await fn.indexMD.readList("all");

    return (
        <html lang="ko">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <Body title={"next-docs"}>
                <Top>
                    {[
                        {
                            src: "/asset/img/svg/account.svg",
                            tooltip: "sign up",
                            href: "/sign/up",
                        },
                        {
                            src: "/asset/img/svg/signin.svg",
                            tooltip: "sign in",
                            href: "/sign/in",
                        },
                    ]}
                </Top>
                <>side</>
                {children}
                <Footer name="Ciao Lee" since="1987-09-24" />
            </Body>
            <TopButton />
        </html>
    );
};

export default Layout;

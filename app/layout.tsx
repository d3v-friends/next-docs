import Top from "@comby/top";
import moment from "moment";
import type { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";
import Body from "@pure/body";
import Footer from "@pure/footer";
import OnTop from "@client/onTop";
import ToolTip from "@pure/tooltip";
import Divider from "@comby/layout";
import Profile from "@comby/profile";
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

const Layout = async ({ children }: Props): Promise<JSX.Element> => {
    return (
        <html lang="ko">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={css.body}>
                <Body>
                    <Top title={"next-docs"}>
                        <ToolTip tooltip={"signIn"}>
                            <Image src={"/asset/img/svg/account.svg"} alt={"account"} width={30} height={30} />
                        </ToolTip>
                    </Top>

                    <Divider>
                        <Profile />
                        <>{children}</>
                    </Divider>

                    <Footer since={moment("1987-09-24").toDate()} name={"Ciao Lee"} />
                    <OnTop />
                </Body>
            </body>
        </html>
    );
};

export default Layout;

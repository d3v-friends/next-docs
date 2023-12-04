import { getSession, SessionStatus } from "@action/sign";
import srcSignOut from "./signout.svg";
import srcSignUp from "./signup.svg";
import srcSignIn from "./signin.svg";
import Client from "@client";
import Pure from "@pure";
import Tag from "@tag";
import type { Metadata } from "next";
import { ReactNode, JSX } from "react";
import Footer from "@pure/footer";
import Body from "@pure/body";
import Top, { TopNavItem } from "@comby/top";

import "@comp/global.css";

const { Debug, Divider } = Pure;
const { GoToTopBtn } = Client;
const {} = Tag;

export const metadata: Metadata = {
    title: "next-docs",
    description: "index.html",
};

type Props = {
    children?: ReactNode;
    params?: {
        slug?: string[];
        session: SessionStatus;
    };
};

const signInTopNav: TopNavItem[] = [
    {
        src: srcSignOut,
        tooltip: "sign out",
        href: "/sign/out",
    },
];

const signOutTopNav: TopNavItem[] = [
    {
        src: srcSignUp,
        tooltip: "sign up",
        href: "/sign/up",
    },
    {
        src: srcSignIn,
        tooltip: "sign in",
        href: "/sign/in",
    },
];

export default async function Layout({ children }: Props): Promise<JSX.Element> {
    const session = await getSession();
    const topNav = session.isSignIn ? signInTopNav : signOutTopNav;

    return (
        <html lang="ko">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <Body title={"next-docs"}>
                <Top>{topNav}</Top>
                <>side</>
                {children}
                <>
                    <Footer name="Ciao Lee" since="1987-09-24" />
                    <Debug>
                        <Divider>
                            <>session</>
                            <>{session.isSignIn ? "true" : "false"}</>
                        </Divider>
                        <Divider>
                            <>username</>
                            <>{session.account.username}</>
                        </Divider>
                        <Divider>
                            <>readable</>
                            <div>{session.account.readable}</div>
                        </Divider>
                    </Debug>
                    <GoToTopBtn />
                </>
            </Body>
        </html>
    );
}

import { getSession } from "@action/sign";
import App from "@app";
import Client from "@client";
import Pure from "@pure";
import type { Metadata } from "next";
import { ReactNode, JSX } from "react";
import Footer from "@pure/footer";
import Body from "@pure/body";
import "@comp/global.css";

const { Debug, Divider } = Pure;
const { GoToTopBtn } = Client;
const { Top } = App;

export const metadata: Metadata = {
    title: "next-docs",
    description: "index.html",
};

type Props = {
    children?: ReactNode;
};

export default async function Layout({ children }: Props): Promise<JSX.Element> {
    const session = await getSession();

    return (
        <html lang="ko">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <Body title={"next-docs"}>
                <Top />
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

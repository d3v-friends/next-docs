import GoTop from "@app/goTop";
import Top from "@app/top";
import Side from "@app/side";
import Footer from "@block/footer";
import Body from "@block/layout";
import fnEnv from "@fn/env";
import { getSession } from "@fn/action";
import fnMD from "@fn/md";
import type { Metadata } from "next";
import { ReactNode, JSX } from "react";
import css from "@style/body.module.scss";
import "@css";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: `${fnEnv.string("MT_PREFIX", "next-docs")}:Home`,
    };
};

type Props = {
    children?: ReactNode;
};

export default async function Layout({ children }: Props): Promise<JSX.Element> {
    const session = await getSession();
    const logo = fnEnv.string("MT_PREFIX", "next-docs");

    const idxContent = await fnMD.idx.readWithOpt({
        readable: session.account.readable,
        tags: {
            tags: ["contents"],
            isCorrect: true,
        },
    });

    const idxDoc = await fnMD.idx.readWithOpt({
        readable: session.account.readable,
    });

    return (
        <html lang="ko">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={css.body}>
                <Body title={logo}>
                    <Top />
                    <Side idxDoc={idxDoc} idxContent={idxContent} />
                    <>{children}</>
                    <>
                        <Footer name="Ciao Lee" since="1987-09-24" />
                        <GoTop />
                    </>
                </Body>
            </body>
        </html>
    );
}

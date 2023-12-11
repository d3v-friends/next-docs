"use server";
import { getConfig, getSession } from "@fn/action";
import Button from "./button";
import Breadcrumb from "./breadcrumb";
import OnReload from "@event/onReload";
import css from "./index.module.scss";
import svg from "@svg/secondary";

type ButtonData = {
    imgSrc: string;
    href: string;
    tooltip: string;
};

export default async function Comp() {
    const session = await getSession();
    const config = await getConfig();
    const buttonList: ButtonData[] = [];

    if (session.isSignIn) {
        if (session.account.readable === "admin") {
            buttonList.push({
                imgSrc: svg.manage,
                href: "/manage",
                tooltip: "Manage",
            });
        }

        buttonList.push({
            imgSrc: svg.signOut,
            href: "/sign/out",
            tooltip: "Sign out",
        });
    } else {
        if (config.signUp) {
            buttonList.push({
                imgSrc: svg.signUp,
                href: "/sign/up",
                tooltip: "Sign up",
            });
        }
        if (config.signIn) {
            buttonList.push({
                imgSrc: svg.signIn,
                href: "/sign/in",
                tooltip: "Sign in",
            });
        }
    }

    return (
        <div className={css.cont}>
            <div className={css.breadcrumb}>
                <Breadcrumb />
            </div>
            <div className={css.button}>
                {buttonList.map((v, i) => (
                    <Button key={i} imgSrc={v.imgSrc} href={v.href} tooltip={v.tooltip} />
                ))}
            </div>
        </div>
    );
}

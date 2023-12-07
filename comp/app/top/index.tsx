"use server";
import { getConfig, getSession } from "@fn/action";
import { JSX } from "react";
import Breadcrumb from "@block/breadcrumb";
import IconPack from "@block/icon/svg";
import IconBtn from "./btn";
import OnReload from "./on-reload";
import css from "./index.module.scss";

export type TopNavItem = {
    src: string;
    href: string;
    tooltip: string;
};

const signInTopNav: TopNavItem[] = [];
const signOutTopNav: TopNavItem[] = [
    {
        src: IconPack.Secondary.SignUp,
        tooltip: "sign up",
        href: "/sign/up",
    },
    {
        src: IconPack.Secondary.SignIn,
        tooltip: "sign in",
        href: "/sign/in",
    },
];

export default async function Comp(): Promise<JSX.Element> {
    const nav: TopNavItem[] = [];
    const session = await getSession();
    const config = await getConfig();
    if (!session.isSignIn) {
        if (config.signUp) {
            nav.push({
                src: IconPack.Secondary.SignUp,
                tooltip: "sign up",
                href: "/sign/up",
            });
        }
        if (config.signIn) {
            nav.push({
                src: IconPack.Secondary.SignIn,
                tooltip: "sign in",
                href: "/sign/in",
            });
        }
    }

    return (
        <div className={css.cont}>
            <Breadcrumb></Breadcrumb>
            <div className={css.space}></div>
            {nav.map((v, i) => (
                <IconBtn key={i} href={v.href} imgSrc={v.src} tooltip={v.tooltip} />
            ))}
            {session.isSignIn && (
                <OnReload>
                    <IconBtn href={"/sign/out"} imgSrc={IconPack.Secondary.SignOut} tooltip="Sign out" />
                </OnReload>
            )}
        </div>
    );
}

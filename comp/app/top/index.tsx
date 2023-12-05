"use server";
import { getSession } from "@action/sign";
import Pure from "@pure";
import Breadcrumb from "@pure/breadcrumb";
import { JSX } from "react";
import IconBtn from "./btn";
import OnReload from "./on-reload";
import css from "./index.module.scss";

type Props = {};

export type TopNavItem = {
    src: string;
    href: string;
    tooltip: string;
};

const { SvgPack } = Pure;

const signInTopNav: TopNavItem[] = [];

const signOutTopNav: TopNavItem[] = [
    {
        src: SvgPack.Secondary.SignUp,
        tooltip: "sign up",
        href: "/sign/up",
    },
    {
        src: SvgPack.Secondary.SignIn,
        tooltip: "sign in",
        href: "/sign/in",
    },
];

export default async function Comp({}: Props): Promise<JSX.Element> {
    const session = await getSession();
    const ls = session.isSignIn ? signInTopNav : signOutTopNav;

    return (
        <div className={css.cont}>
            <Breadcrumb></Breadcrumb>
            <div className={css.space}></div>
            {ls.map((v, i) => (
                <IconBtn key={i} href={v.href} imgSrc={v.src} tooltip={v.tooltip} />
            ))}
            {session.isSignIn && (
                <OnReload>
                    <IconBtn href={"/sign/out"} imgSrc={SvgPack.Secondary.SignOut} tooltip="Sign out" />
                </OnReload>
            )}
        </div>
    );
}

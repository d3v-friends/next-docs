"use server";
import { JSX } from "react";
import Breadcrumb from "@block/breadcrumb";
import fnSign from "@fn/sign";
import IconPack from "@block/icon/svg";
import IconBtn from "./btn";
import OnReload from "./on-reload";
import css from "./index.module.scss";

export type TopNavItem = {
    src: string;
    href: string;
    tooltip: string;
};

const { getSession } = fnSign;

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

type Props = {};

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
                    <IconBtn href={"/sign/out"} imgSrc={IconPack.Secondary.SignOut} tooltip="Sign out" />
                </OnReload>
            )}
        </div>
    );
}

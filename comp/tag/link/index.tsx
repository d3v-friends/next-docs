import cutil from "@cutil";
import Image from "next/image";
import css from "./index.module.scss";
import Link from "next/link";
import { ReactNode, JSX, HTMLAttributeAnchorTarget } from "react";

const { merge } = cutil;

interface Props {
    href: string;
    target?: HTMLAttributeAnchorTarget;
    type?: "block" | "inline";
    children?: ReactNode;
    className?: string;
    iconSrc?: string;
}

const Comp = async ({ href, children, target, className, type, iconSrc }: Props): Promise<JSX.Element> => {
    target = target || "_self";
    type = type || "inline";
    className = className || "";

    return (
        <Link href={href} target={target} className={merge(className, css.a, css[type])}>
            <div className={css.cont}>
                {iconSrc && <Image className={css.icon} src={iconSrc} alt={href} height={20} width={20} />}
                <div className={css.children}>{children}</div>
            </div>
        </Link>
    );
};

export default Comp;

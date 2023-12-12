import blockUtil from "@block/blockUtil";
import Link from "next/link";
import { ReactNode } from "react";
import css from "./index.module.scss";

type Props = {
    title: ReactNode;
    children: TabArgs[];
    activeName?: string;
};

export type TabArgs = {
    name: string;
    href: string;
};

export default function Comp({ title, children, activeName }: Props) {
    const isActiveCss = (name: string) => {
        return name === activeName ? css.active : "";
    };
    return (
        <>
            {title}
            <div className="mb-100" />
            <div className={blockUtil.merge(css.cont, "mb-100")}>
                {children.map((v, i) => (
                    <Link className={blockUtil.merge(css.link, isActiveCss(v.name))} href={v.href} key={i}>
                        {v.name}
                    </Link>
                ))}
            </div>
        </>
    );
}

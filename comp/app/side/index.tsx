"use server";
import { JSX } from "react";
import fnMd from "@fn/md";
import fnSign from "@fn/sign";
import css from "./index.module.scss";

type Props = {
    children?: JSX.Element;
};

export default async function Comp({ children }: Props): Promise<JSX.Element> {
    const session = await fnSign.getSession();
    const ls = await fnMd.index.filter({}, true);
    return (
        <div>
            <div>{children}</div>
            {ls.map((v, i) => (
                <div key={i}>{v.path}</div>
            ))}
            <div></div>
        </div>
    );
}

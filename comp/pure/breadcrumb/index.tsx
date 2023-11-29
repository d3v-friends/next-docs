import fn from "@comp/index";
import { Metadata } from "next";
import Link from "next/link";
import { JSX } from "react";
import css from "./index.module.scss";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "title",
        description: "page",
    };
};

type Props = {
    children: string;
};

const comp = async ({ children }: Props): Promise<JSX.Element> => {
    const pathLS = children
        .split("/")
        .filter(v => v !== "")
        .map(v => `/${v}`);

    const getHref = (i: number): string => {
        return fn.url.glue(...pathLS.slice(0, i));
    };

    return (
        <div className={css.cont}>
            {pathLS.map((v, i) => (
                <Link className={css.link} href={getHref(i)} key={i}>
                    {v}
                </Link>
            ))}
        </div>
    );
};

export default comp;

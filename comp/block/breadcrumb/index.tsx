import Link from "next/link";
import { JSX } from "react";
import css from "./index.module.scss";

type Props = {
    path?: string;
    children?: string;
};

const comp = async ({ children, path }: Props): Promise<JSX.Element> => {
    const p = children || path || "";
    if (p === "") return <></>;

    const pathLS = p
        .split("/")
        .filter(v => v !== "")
        .map(v => `/${v}`);

    const getHref = (i: number): string => {
        let res = "";
        for (const str of pathLS) {
            res += `/${str}`;
        }
        return res;
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

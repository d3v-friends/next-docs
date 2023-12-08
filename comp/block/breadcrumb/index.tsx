import Link from "next/link";
import { JSX } from "react";
import css from "./index.module.scss";

type Props = {
    children?: string;
};

const comp = async ({ children }: Props): Promise<JSX.Element> => {
    const p = children || "";
    if (p === "") return <></>;

    const pathLS = p
        .split("/")
        .filter(v => v !== "")
        .map(v => `/${v}`);

    const getHref = (i: number): string => {
        let res = "/doc";
        for (let j = 0; j < i; j++) {
            res += `${pathLS[i]}`;
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

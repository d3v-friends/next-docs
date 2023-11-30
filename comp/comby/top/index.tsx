import fnCss from "@pure/fnCss";
import Breadcrumb from "@pure/breadcrumb";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "@pure/tooltip";
import { JSX } from "react";
import css from "./index.module.scss";

type Props = {
    path?: string;
    children?: {
        src: string;
        href: string;
        tooltip: string;
    }[];
};

const comp = async ({ path, children }: Props): Promise<JSX.Element> => {
    children = children || [];
    return (
        <div className={css.cont}>
            <Breadcrumb>{path}</Breadcrumb>
            <div className={css.space}></div>
            {children.map((v, i) => (
                <div className={css.icon} key={i}>
                    <Link href={v.href}>
                        <Tooltip tooltip={v.tooltip}>
                            <Image className={css.iconImg} src={v.src} alt={v.href} width={50} height={50} />
                        </Tooltip>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default comp;

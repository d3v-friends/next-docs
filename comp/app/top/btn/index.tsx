import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import css from "./index.module.scss";
import Tooltip from "@tag/tooltip";

interface Props {
    imgSrc: string;
    href: string;
    tooltip: string;
}

export default async function Comp({ imgSrc, href, tooltip }: Props): Promise<JSX.Element> {
    return (
        <div className={css.icon}>
            <Link href={href}>
                <Tooltip tooltip={tooltip}>
                    <Image className={css.iconImg} src={imgSrc} alt={href} width={50} height={50} />
                </Tooltip>
            </Link>
        </div>
    );
}

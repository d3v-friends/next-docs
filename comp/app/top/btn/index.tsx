import Tooltip from "@pure/tooltip";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import css from "./index.module.scss";

interface Props {
    imgSrc: string;
    href: string;
    tooltip: string;
}

export default function Comp({ imgSrc, href, tooltip }: Props): JSX.Element {
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

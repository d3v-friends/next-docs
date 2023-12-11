import blockUtil from "@block/blockUtil";
import Image from "next/image";
import Link from "next/link";
import css from "./index.module.scss";
import Tooltip from "@block/tooltip";

type Props = {
    imgSrc: string;
    href: string;
    tooltip: string;
};

export default function Comp({ imgSrc, href, tooltip }: Props) {
    return (
        <div className={css.cont}>
            <Tooltip tooltip={tooltip}>
                <Link href={href}>
                    <Image className={blockUtil.merge(css.img, "ml-30")} src={imgSrc} alt={imgSrc} width={30} height={30} />
                </Link>
            </Tooltip>
        </div>
    );
}

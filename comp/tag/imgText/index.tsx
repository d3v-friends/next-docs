import fnCss from "@fn/css";
import Image from "next/image";
import { ReactNode } from "react";
import css from "./index.module.scss";

type Props = {
    src: string;
    className?: string;
    children?: ReactNode;
};

export default function Comp({ children, src, className }: Props): ReactNode {
    className = className || "";
    return (
        <div className={css.cont}>
            <Image className={css.img} src={src} alt={src} width={50} height={50} />
            <div className={fnCss.merge(css.content, className)}>{children}</div>
        </div>
    );
}

import Image from "next/image";
import { ReactNode } from "react";
import css from "./index.module.scss";

type Props = {
    src: string;
    size?: number;
    children?: ReactNode;
};

export default function Comp({ children, src, size }: Props): ReactNode {
    size = size || 30;
    return (
        <div className={css.cont}>
            <Image src={src} alt={src} width={size} height={size} />
            <div className={css.div} style={{ fontSize: size * 0.9, height: size }}>
                {children}
            </div>
        </div>
    );
}

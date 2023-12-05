import Image from "next/image";
import { ReactNode } from "react";
import css from "./index.module.scss";

type Props = {
    src: string;
    size?: number;
    children?: ReactNode;
};

export default function Comp({ children, src, size }: Props): ReactNode {
    size = size || 18;
    return (
        <div className={css.cont}>
            <Image className={css.svgFilterPrimary} src={src} alt={src} width={size} height={size} />
            <div style={{ fontSize: size * 0.9, height: size }}>{children}</div>
        </div>
    );
}

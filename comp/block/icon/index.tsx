import cutil from "@cutil";
import Image from "next/image";
import { JSX } from "react";

interface Props {
    src: string;
    className?: string;
    width?: number;
    height?: number;
}

export default function Comp({ src, width, height, className }: Props): JSX.Element {
    return <Image src={src} className={cutil.merge(className || "")} width={width || 50} height={height || 50} alt={src} />;
}

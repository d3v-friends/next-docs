import blockUtil from "@block/blockUtil";
import { Location } from "@block/type";
import Image from "next/image";
import { ReactNode } from "react";
import css from "./index.module.scss";
import Tooltip from "@block/tooltip";

type Props = {
    src: string;
    hover?: boolean;
    width?: number;
    height?: number;
    children?: ReactNode;
    isText?: boolean;
    tooltip?: string;
    className?: string;
    tooltipLoc?: Location;
};

export default function Comp({ className, children, src, width, height, hover, isText, tooltip, tooltipLoc }: Props) {
    const hoverCss = hover ? css.hover : "";
    const textCss = isText ? css.text : "";
    className = className || "";
    width = width || 50;
    height = height || 50;

    const Content = ({ className }: { className: string }) => (
        <span className={blockUtil.merge(css.cont, textCss, hoverCss, className)}>
            <Image className={blockUtil.merge(css.img)} src={src} alt={src} width={width} height={height} />
            {children}
        </span>
    );

    return tooltip ? (
        <Tooltip tooltip={tooltip} loc={tooltipLoc}>
            <Content className={className} />
        </Tooltip>
    ) : (
        <Content className={className} />
    );
}

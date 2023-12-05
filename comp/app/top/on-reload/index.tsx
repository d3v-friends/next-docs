"use client";
import fnCss from "@fn/css";
import { useRouter } from "next/navigation";
import { JSX, ReactNode } from "react";

type Props = {
    className?: string;
    children?: ReactNode;
};

export default function Comp({ children, className }: Props): JSX.Element {
    const router = useRouter();
    const onClick = () => {
        router.refresh();
    };

    return (
        <div className={fnCss.merge(className || "")} onClick={onClick}>
            {children}
        </div>
    );
}

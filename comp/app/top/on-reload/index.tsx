"use client";
import cutil from "@cutil";
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
        <div className={cutil.merge(className || "")} onClick={onClick}>
            {children}
        </div>
    );
}

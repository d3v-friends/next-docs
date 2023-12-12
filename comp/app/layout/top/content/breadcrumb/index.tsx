"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import css from "./index.module.scss";

type Props = {
    children?: ReactNode;
};

export default function Comp({ children }: Props) {
    const path = usePathname();
    if (!path.startsWith("/doc")) return <></>;

    return <>{children}</>;
}

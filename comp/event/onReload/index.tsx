"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export default function Comp({ children }: Props) {
    const router = useRouter();
    const onClick = () => {
        router.refresh();
    };
    return <div onClick={onClick}>{children}</div>;
}

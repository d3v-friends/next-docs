"use client";
import Loading from "@block/loading";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

interface Props {
    className?: string;
    children?: ReactNode;
}

export default function Comp({ children, className }: Props) {
    const router = useRouter();
    const { pending } = useFormStatus();
    const [init, setInit] = useState(false);

    className = className || "";
    useEffect(() => {
        if (init) return;
        if (!pending) return;
        router.refresh();
    }, [pending]);
    return (
        <>
            <button className={className} disabled={pending} aria-disabled={pending}>
                {children}
            </button>
            <Loading pending={pending} />
        </>
    );
}

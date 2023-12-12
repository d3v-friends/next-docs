"use client";
import { signOutAction } from "@fn/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Comp() {
    const router = useRouter();
    useEffect(() => {
        const deleteSession = async () => {
            await signOutAction(null, new FormData());
        };

        deleteSession()
            .then(() => router.refresh())
            .then(() => router.push("/"));
    }, []);
    return <></>;
}

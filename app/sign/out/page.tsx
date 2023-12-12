"use client";
import { signOutAction } from "@fn/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
    params: {};
    searchParams: {};
};

export default function Comp({}: Props) {
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

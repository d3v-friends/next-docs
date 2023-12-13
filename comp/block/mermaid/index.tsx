"use client";
import mermaid from "mermaid";
import { ReactNode, useEffect } from "react";

interface Props {
    children?: ReactNode;
}

mermaid.initialize({
    startOnLoad: false,
    darkMode: true,
    theme: "forest",
});

export default function Comp({ children }: Props) {
    useEffect(() => {
        mermaid
            .run({
                querySelector: ".mermaid",
            })
            .catch(res => console.log(res));
    }, [children]);
    return <>{children}</>;
}

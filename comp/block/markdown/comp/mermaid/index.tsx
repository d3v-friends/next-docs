"use client";
import { JSX, useEffect } from "react";
import mermaid from "mermaid";

type Props = {
    children: string;
};

mermaid.initialize({
    startOnLoad: false,
    darkMode: true,
    theme: "forest",
});

export default function Comp({ children }: Props): JSX.Element {
    useEffect(() => {
        mermaid
            .run({
                querySelector: ".mermaid",
            })
            .catch(res => console.log(`mermaid comp: ${JSON.stringify(res)}`));
    }, []);
    return <pre className="mermaid">{children}</pre>;
}

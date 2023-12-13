"use client";
import { JSX, useEffect, useRef } from "react";
import mermaid from "mermaid";

type Props = {
    children: string;
};

mermaid.initialize({
    startOnLoad: false,
    darkMode: true,
    theme: "forest",
});

export default function Comp({ children }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!ref) return;

        mermaid
            .run({
                querySelector: `.mermaid`,
            })
            .catch(res => console.log(`mermaid comp: ${JSON.stringify(res)}`));
    }, [ref]);
    return (
        <div className="mermaid" ref={ref}>
            {children}
        </div>
    );
}

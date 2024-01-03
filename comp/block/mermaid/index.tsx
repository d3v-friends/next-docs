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
    themeVariables: {
        fontFamily: "ibm-flex",
        fontSize: "1rem",
        textColor: "#6b9454",
        lineColor: "#b4cbad",
        secondaryBorderColor: "#fff"
    }
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

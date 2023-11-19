import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "layout",
    description: "layout",
};

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <h2>page layout</h2>
            {children}
        </>
    );
}

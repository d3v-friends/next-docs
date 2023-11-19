import type { Metadata } from "next";
import { ReactNode } from "react";
import Container from "@comp/container";
import "@comp/index.css";
import UContainer, { UTop } from "@comp/top";

import getHeaders from "@next/headers";

export const metadata: Metadata = {
    title: "d3v_friends",
    description: "index",
};

const topNavLs = [
    { url: "/ue5", label: "UE5" },
    { url: "/web", label: "Web" },
];

export default async function Layout({ children }: { children: ReactNode }) {
    const headers = getHeaders();

    return (
        <html lang="ko">
            <body>
                <Container>
                    <UContainer title="d3v-friends">
                        <UTop.Space />
                        <UTop.Item href="/sign/in">SignIn</UTop.Item>
                    </UContainer>
                    {children}
                </Container>
            </body>
        </html>
    );
}

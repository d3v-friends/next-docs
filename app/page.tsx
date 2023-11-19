import type { Metadata, NextPageContext } from "next";

export const metadata: Metadata = {
    title: "page",
    description: "page template",
};
export default function Page(props: string) {
    return <>index page</>;
}

import { JSX } from "react";
import Markdown from "@block/markdown";

export default async function Page(): Promise<JSX.Element> {
    return <Markdown># 123</Markdown>;
}

"use client";
import Tags from "@tag/index";
import { usePathname } from "next/navigation";
import { JSX } from "react";

type Props = {};

const { P1 } = Tags;
export default function Comp({}: Props): JSX.Element {
    const path = usePathname();
    let print = "";
    if (path.startsWith("/doc")) {
        print = path.slice(4, path.length);
    }
    return <P1>{print}</P1>;
}

"use client";
import { JSX } from "react";
import css from "./index.module.scss";

interface Props {
    children?: JSX.Element;
}

export default function Comp({ children }: Props): JSX.Element {
    return (
        <div>
            <h1>comp</h1>
        </div>
    );
}

"use client";
import { ReactNode } from "react";
import css from "./index.module.scss";
import svg from "@svg/index";
import Icon from "@block/icon";

type Props = {
    name?: string;
    checked?: boolean;
    children?: ReactNode;
    onClick?: Function;
};
const {
    primary: { checkTrue, checkFalse },
} = svg;

export default function Comp({ children, checked, name, onClick }: Props) {
    const on = () => {
        if (onClick) onClick();
    };

    return (
        <>
            <input className={css.input} name={name} type="checkbox" checked={checked} onChange={on} />
            <span onClick={on}>
                <Icon isText src={checked ? checkTrue : checkFalse}>
                    {children}
                </Icon>
            </span>
        </>
    );
}

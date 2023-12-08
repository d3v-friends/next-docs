import cutil from "@cutil";
import { JSX, HTMLInputTypeAttribute, ChangeEventHandler, KeyboardEventHandler } from "react";
import css from "./index.module.scss";

type IArgs = {
    type: HTMLInputTypeAttribute;
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    autoComplete?: "on" | "off";
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onEnter?: Function;
    size?: 1 | 2 | 3;
    value?: any;
    className?: string;
};

const { merge } = cutil;

export default function Comp({
    type,
    name,
    placeholder,
    label,
    required,
    onChange,
    autoComplete,
    size,
    onEnter,
    value,
    className,
}: IArgs): JSX.Element {
    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = ev => {
        if (!onEnter) return;
        if (ev.key !== "Enter") return;
        onEnter();
    };
    return (
        <>
            {label && (
                <label htmlFor={name} className={merge(css.inputLabel, css.marginBottom)}>
                    {label}
                </label>
            )}

            <input
                id={name}
                value={value}
                className={merge(css.input, css.marginBottom, css[`size${size || 1}`], className || "")}
                type={type}
                name={name}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required={required}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </>
    );
}

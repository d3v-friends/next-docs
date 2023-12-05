import cutil from "@cutil";
import { JSX, HTMLInputTypeAttribute } from "react";
import css from "./index.module.scss";

type IArgs = {
    type: HTMLInputTypeAttribute;
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
};

const { merge } = cutil;

const Comp = async ({ type, name, placeholder, label, required }: IArgs): Promise<JSX.Element> => {
    return (
        <>
            {label && (
                <label htmlFor={name} className={merge(css.inputLabel, css.marginBottom)}>
                    {label}
                </label>
            )}
            <input
                id={name}
                className={merge(css.input, css.marginBottom)}
                type={type}
                name={name}
                placeholder={placeholder}
                autoComplete={"on"}
                required={required}
            />
        </>
    );
};

export default Comp;

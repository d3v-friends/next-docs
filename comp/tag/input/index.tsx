import { v4 } from "uuid";
import merge from "../merge";
import { ReactNode, JSX, HTMLInputTypeAttribute } from "react";
import css from "./index.module.scss";

interface Props {
    children?: ReactNode;
}

type IArgs = {
    type: HTMLInputTypeAttribute;
    name: string;
    label?: string;
    placeholder?: string;
};

const Comp = async ({ type, name, placeholder, label }: IArgs): Promise<JSX.Element> => {
    const id = v4();
    return (
        <>
            {label && (
                <label htmlFor={id} className={merge(css.inputLabel, css.marginBottom)}>
                    {label}
                </label>
            )}
            <input
                id={id}
                className={merge(css.input, css.marginBottom)}
                type={type}
                name={name}
                placeholder={placeholder}
                autoComplete={"on"}
            />
        </>
    );
};

export default Comp;

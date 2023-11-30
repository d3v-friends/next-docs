import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

type Props = {
    submit: (form: FormData) => Promise<void>;
    children: {
        name: string;
        type: string;
        placeholder?: string;
    }[];
};

const Comp = ({ children, submit }: Props): JSX.Element => {
    return (
        <form action={submit}>
            {children.map((v, i) => (
                <input key={i} name={v.name} type={v.type} placeholder={v.placeholder} />
            ))}
        </form>
    );
};

export default Comp;

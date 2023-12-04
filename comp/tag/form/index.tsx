import onShow from "@client/onShow";
import { FormEvent, ReactNode } from "react";
import css from "./index.module.scss";

export type FormAction = (formData: FormData) => void;

type Props = {
    onAction?: FormAction;
    disabled?: boolean;
    children: ReactNode;
    onSubmit?: (ev: FormEvent<HTMLFormElement>) => void;
};
const Comp = ({ onAction, disabled, children, onSubmit }: Props) => (
    <form className={css.form} action={onAction} aria-disabled={disabled} onSubmit={onSubmit}>
        {children}
    </form>
);

export default Comp;

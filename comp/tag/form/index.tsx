import { ReactNode } from "react";
import css from "./index.module.scss";

export type FormAction = (formData: FormData) => void;

type Props = {
    onAction: FormAction;
    disabled?: boolean;
    children: ReactNode;
};
const Comp = ({ onAction, disabled, children }: Props) => (
    <form className={css.form} action={onAction} aria-disabled={disabled}>
        {children}
    </form>
);

export default Comp;

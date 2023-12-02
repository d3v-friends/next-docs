"use client";
import OnModal from "@client/onModal";
import OnOff from "@client/onOff";
import { ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom";
import css from "./index.module.scss";

export type FormAction = (prev: any, data: FormData) => Promise<FormError | void>;
export type FormError = { message: string };

type Props = {
    onAction: FormAction;
    children: ReactNode;
};
const Comp = ({ onAction, children }: Props) => {
    const { pending } = useFormStatus();
    const [state, formAction] = useFormState(onAction, { message: "" });

    return (
        <>
            <OnOff on={!!state}>
                <OnModal header="Error">{state?.message}</OnModal>
            </OnOff>
            <form className={css.form} action={formAction} aria-disabled={pending}>
                {children}
            </form>
        </>
    );
};

export default Comp;

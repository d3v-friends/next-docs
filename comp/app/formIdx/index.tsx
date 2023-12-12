"use client";
import fnAct from "@fn/act";
import { resetIndexAction } from "@fn/action";
import { useFormState, useFormStatus } from "react-dom";
import Modal from "@app/formModalMsg";

type Props = {};

export default function Comp({}: Props) {
    const { pending } = useFormStatus();
    const [state, action] = useFormState(resetIndexAction, fnAct.initAction());

    return (
        <>
            <h5 className="mb-100">File index</h5>
            <form action={action} aria-disabled={pending}>
                <button type="submit" disabled={pending} className="primary outline">
                    reset
                </button>
            </form>
            <Modal state={state} isSuccessMsg={true} />
        </>
    );
}

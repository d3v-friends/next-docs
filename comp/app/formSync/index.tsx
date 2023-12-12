"use client";
import fnAct from "@fn/act";
import { syncGitAction } from "@fn/action";
import { useFormState, useFormStatus } from "react-dom";
import Modal from "@app/formModalMsg";

type Props = {};

export default function Comp({}: Props) {
    const { pending } = useFormStatus();
    const [state, action] = useFormState(syncGitAction, fnAct.initAction());

    return (
        <>
            <h5 className="mb-100">git sync</h5>
            <form action={action} aria-disabled={pending}>
                <button className="primary outline" disabled={pending} aria-disabled={pending}>
                    Sync
                </button>
            </form>

            <Modal state={state} isSuccessMsg />
        </>
    );
}

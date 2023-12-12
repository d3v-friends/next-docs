"use client";
import fnAct from "@fn/act";
import { syncGitAction } from "@fn/action";
import { useFormState } from "react-dom";
import Modal from "@app/formModalMsg";
import Submit from "@app/submit";

export default function Comp() {
    const [state, action] = useFormState(syncGitAction, fnAct.initAction());

    return (
        <>
            <form className="width-100per" action={action}>
                <Submit className="primary outline">Sync</Submit>
            </form>
            <Modal state={state} isSuccessMsg />
        </>
    );
}

"use client";
import fnAct from "@fn/act";
import { initGitAction } from "@fn/action";
import { FormKey } from "@fn/type";
import { useFormState, useFormStatus } from "react-dom";
import Modal from "@app/formModalMsg";

type Props = {
    repo: string;
};

const { git } = FormKey;

export default function Comp({ repo }: Props) {
    const [state, action] = useFormState(initGitAction, fnAct.initAction());
    const { pending } = useFormStatus();
    return (
        <>
            <h5 className="mb-100">Git ({repo || "not cloned"})</h5>
            <form action={action} aria-disabled={pending}>
                <label htmlFor={git.url}>url</label>
                <input type="url" name={git.url} id={git.url} />

                <label htmlFor={git.key}>access key</label>
                <input type="password" name={git.key} id={git.key} />

                <hr />
                <button type="submit" className="primary outline" aria-disabled={pending}>
                    reset
                </button>
            </form>
            <Modal state={state} isSuccessMsg={true} />
        </>
    );
}

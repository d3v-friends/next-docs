"use client";
import fnAct from "@fn/act";
import { initGitAction } from "@fn/action";
import { FormKey } from "@fn/type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Submit from "@app/submit";
import Modal from "@app/formModalMsg";

type Props = {};

const { git } = FormKey;

export default function Comp({}: Props) {
    const router = useRouter();
    const [state, action] = useFormState(initGitAction, fnAct.initAction());
    const { pending } = useFormStatus();

    useEffect(() => {
        router.refresh();
    }, [state.responseAt]);

    return (
        <>
            <form action={action} aria-disabled={pending}>
                <label htmlFor={git.url}>url</label>
                <input type="url" name={git.url} id={git.url} />

                <label htmlFor={git.key}>access key</label>
                <input type="password" name={git.key} id={git.key} />

                <label htmlFor={git.username}>username</label>
                <input type="text" name={git.username} id={git.username} />

                <label htmlFor={git.email}>email</label>
                <input type="email" name={git.email} id={git.email} />

                <hr />
                <Submit className="primary outline">Reset</Submit>
            </form>
            <Modal state={state} isSuccessMsg={true} />
        </>
    );
}

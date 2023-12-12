"use client";
import Submit from "@app/submit";
import fnAct from "@fn/act";
import { signInAction } from "@fn/action";
import { FormKey } from "@fn/type";
import { useFormState, useFormStatus } from "react-dom";
import FormModalMsg from "@app/formModalMsg";

type Props = {};

const { sign } = FormKey;

export default function Comp({}: Props) {
    const { pending } = useFormStatus();
    const [state, action] = useFormState(signInAction, fnAct.initAction());

    return (
        <>
            <form action={action} aria-disabled={pending}>
                <label htmlFor="username">username</label>
                <input id="username" type="text" name={sign.username} />

                <label htmlFor="password">password</label>
                <input id="password" type="password" name={sign.password} />
                <hr />
                <Submit className="primary fill">Sign in</Submit>
            </form>
            <FormModalMsg state={state} />
        </>
    );
}

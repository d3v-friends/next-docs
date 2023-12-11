"use client";
import fnAct from "@fn/act";
import { signUpAction } from "@fn/action";
import { FormKey } from "@fn/type";
import { useFormState, useFormStatus } from "react-dom";
import FormModalMsg from "@app/formModalMsg";

const { sign } = FormKey;
export default function Comp() {
    const { pending } = useFormStatus();
    const [state, action] = useFormState(signUpAction, fnAct.initAction());

    return (
        <>
            <form action={action} aria-disabled={pending}>
                <label htmlFor={sign.username}>username</label>
                <input id={sign.username} name={sign.username} type="text" />

                <label htmlFor={sign.password}>password (1/2)</label>
                <input id={sign.password} name={sign.password} type="password" />

                <label htmlFor={sign.confirm}>password (2/2)</label>
                <input id={sign.confirm} name={sign.confirm} type="password" />

                <hr />
                <button className="primary fill" type="submit">
                    Sign up
                </button>
            </form>

            <FormModalMsg state={state} />
        </>
    );
}

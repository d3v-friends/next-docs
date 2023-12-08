"use client";
import { signInAction } from "@fn/action";
import { InitAction, FormKey } from "@fn/type";
import Tags from "@tag/index";
import { JSX, useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Modal from "@block/modal";

const { Hr, Form, Input, Button } = Tags;
const {
    sign: { username, password },
} = FormKey;

export default function SignIn(): JSX.Element {
    const { pending } = useFormStatus();
    const [state, onAction] = useFormState(signInAction, InitAction());

    const [show, onShow] = useState(false);

    useEffect(() => {
        if (state.code === 200) return;
        onShow(true);
    }, [state.resAt]);

    return (
        <>
            <Form onAction={onAction}>
                <Input size={3} type="text" name={username} label="username" />
                <Input size={3} type="password" name={password} label="password" />
                <Hr />

                <Button size={3} type="submit" ariaDisabled={pending}>
                    Sign In
                </Button>
            </Form>

            {show && (
                <Modal header={"Error"} onOff={() => onShow(false)}>
                    {state.message}
                </Modal>
            )}
        </>
    );
}

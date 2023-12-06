"use client";
import { signUpAction } from "@fn/action";
import { InitAction, FormKey } from "@fn/type";
import Tags from "@tag/index";
import { JSX, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Modal from "@block/modal";

const { Input, Button, Hr, Form } = Tags;
const { sign } = FormKey;
export default function SignUp(): JSX.Element {
    const { pending } = useFormStatus();
    const [state, onAction] = useFormState(signUpAction, InitAction);
    const [show, onShow] = useState(false);

    useEffect(() => {
        if (state.code === 200) return;
        onShow(true);
    }, [state.resAt]);

    return (
        <>
            <Form onAction={onAction}>
                <Input size={3} type="text" name={sign.username} label="username" />
                <Input size={3} type="password" name={sign.password} label="password (1/2)" />
                <Input size={3} type="password" name={sign.confirm} label="password (2/2)" />
                <Hr />

                <Button size={3} type="submit" ariaDisabled={pending}>
                    Sign Up
                </Button>
                <Button size={3} type="reset" style="outline" ariaDisabled={pending}>
                    Reset
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

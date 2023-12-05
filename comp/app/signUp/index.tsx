"use client";
import fn from "@fn";
import Tag from "@tag";
import { JSX, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface Props {}

const { Input, Button, Hr, Form, Modal } = Tag;
const {
    sign: { upAction },
    const: { initAction },
} = fn;

export default function Comp({}: Props): JSX.Element {
    const { pending } = useFormStatus();
    const [state, onAction] = useFormState(upAction, initAction());
    const [show, onShow] = useState(false);

    useEffect(() => {
        if (state.code === 200) return;
        onShow(true);
    }, [state.resAt]);

    return (
        <>
            <Form onAction={onAction}>
                <Input type="text" name="username" label="username" />
                <Input type="password" name="password" label="password (1/2)" />
                <Input type="password" name="confirm" label="password (2/2)" />
                <Hr />

                <Button type="submit" ariaDisabled={pending}>
                    Sign Up
                </Button>
                <Button type="reset" style="outline" ariaDisabled={pending}>
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

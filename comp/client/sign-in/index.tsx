"use client";
import Action from "@action/index";
import { InitFormActionRes } from "@action/type";
import Modal from "@pure/modal";
import Tag from "@tag";
import { JSX, useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

const { Hr, Form, Input, Button } = Tag;
const { sign } = Action;

export default function Comp(): JSX.Element {
    const { pending } = useFormStatus();
    const [state, onAction] = useFormState(sign.in, InitFormActionRes);
    const [show, onShow] = useState(false);

    useEffect(() => {
        if (state.code === 200) return;
        onShow(true);
    }, [state.resAt]);

    return (
        <>
            <Form onAction={onAction}>
                <Input type="text" name="username" label="username" />
                <Input type="password" name="password" label="password" />
                <Hr />

                <Button type="submit" ariaDisabled={pending}>
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

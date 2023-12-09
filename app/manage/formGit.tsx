"use client";
import Blocks from "@block/index";
import fnAct from "@fn/act";
import { gitInitAction } from "@fn/action";
import Tags from "@tag/index";
import { JSX, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const { Form, Button, Input } = Tags;
const { Modal } = Blocks;
export default function Comp(): JSX.Element {
    const [modal, setModal] = useState(false);
    const [state, onAction] = useFormState(gitInitAction, fnAct.initAction());
    const { pending } = useFormStatus();

    useEffect(() => {
        if (state.status === 200) return;
        setModal(true);
    }, [state.responseAt]);

    return (
        <>
            <Form onAction={onAction}>
                <Input name="src" type="url" label="url" />
                <Input name="key" type="password" label="access key" />
                <Button type="submit" ariaDisabled={pending} noMarginBottom>
                    Reset
                </Button>
            </Form>

            {modal && (
                <Modal header={"Alert"} onOff={() => setModal(false)}>
                    {state.message}
                </Modal>
            )}
        </>
    );
}

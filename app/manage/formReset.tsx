"use client";
import Blocks from "@block/index";
import fnAct from "@fn/act";
import { resetIndexAction } from "@fn/action";
import Tags from "@tag/index";
import { JSX, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const { Form, Button, Inline } = Tags;
const { Modal } = Blocks;
export default function Comp(): JSX.Element {
    const [modal, setModal] = useState(false);
    const [state, onAction] = useFormState(resetIndexAction, fnAct.initAction());
    const { pending } = useFormStatus();

    useEffect(() => {
        if (!state.message) return;
        setModal(true);
    }, [state.responseAt]);

    return (
        <>
            <Inline>
                <div style={{ width: "4rem" }}>
                    <Form onAction={onAction} disabled={pending}>
                        <Button type="submit" ariaDisabled={pending} noMarginBottom>
                            Reset
                        </Button>
                    </Form>
                </div>
                <>Index reset</>
            </Inline>

            {modal && (
                <Modal header={"Alert"} onOff={() => setModal(false)}>
                    {state.message}
                </Modal>
            )}
        </>
    );
}

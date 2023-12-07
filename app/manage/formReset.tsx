"use client";
import Blocks from "@block/index";
import { resetIndexAction } from "@fn/action";
import { InitAction } from "@fn/type";
import Tags from "@tag/index";
import { JSX, useEffect, useState } from "react";
import { useFormState } from "react-dom";

const { Form, Button, Divider, Inline } = Tags;
const { Modal } = Blocks;
export default function Comp(): JSX.Element {
    const [modal, setModal] = useState(false);
    const [state, onAction] = useFormState(resetIndexAction, InitAction());

    useEffect(() => {
        if (!state.message) return;
        setModal(true);
    }, [state.resAt]);

    return (
        <>
            <Inline>
                <div style={{ width: "4rem" }}>
                    <Form onAction={onAction}>
                        <Button type="submit" noMarginBottom>
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

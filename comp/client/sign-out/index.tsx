"use client";
import Action from "@action/index";
import Client from "@client";
import Pure from "@pure";
import Tag from "@tag";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import { useFormState } from "react-dom";

const { OnClick } = Client;
const { Form, Button, P1, Space } = Tag;
const { Modal } = Pure;
const { out } = Action.sign;

interface Props {}

export default function Comp({}: Props): JSX.Element {
    const router = useRouter();
    const handler = {
        onClose: () => {
            onShow(false);
            router.back();
        },
        onSubmit: () => {
            onShow(false);
            window.location.href = "/";
            window.location.reload();
        },
    };

    const [show, onShow] = useState(true);

    return (
        <>
            {show && (
                <Modal onOff={handler.onClose} header={"Sign out"}>
                    <P1>Do you wanna sign out?</P1>
                    <Space height={"2rem"} />
                    <Form onSubmit={handler.onSubmit}>
                        <Button type="submit">Sign out</Button>
                        <Button type="button" style="outline">
                            <OnClick onClick={handler.onClose}>Cancel</OnClick>
                        </Button>
                    </Form>
                </Modal>
            )}
        </>
    );
}

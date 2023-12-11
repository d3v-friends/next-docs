"use client";
import { ActionResult } from "@fn/act";
import { useEffect, useState } from "react";
import Modal from "@block/modal";

type Props = {
    isSuccessMsg?: boolean;
    state: ActionResult<any>;
};

export default function Comp({ state, isSuccessMsg }: Props) {
    const [show, setShow] = useState(false);
    const [isFirst, setIsFirst] = useState(true);

    useEffect(() => {
        if (isFirst) {
            setIsFirst(false);
            return;
        }

        if (state.status == 200) {
            if (!isSuccessMsg) return;
        }
        setShow(true);
    }, [state.responseAt]);

    useEffect(() => {
        if (typeof window == "undefined") return;

        const handler = (ev: any) => {
            if (ev.key == "Escape") setShow(false);
        };

        window.addEventListener("keydown", handler);
        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, []);

    return (
        <>
            {show && (
                <Modal header="Alert" onClose={() => setShow(false)}>
                    {state.message}
                </Modal>
            )}
        </>
    );
}

"use client";
import Action from "@action/index";
import Tag from "@tag";
import { ReactNode, JSX } from "react";
import { useFormState } from "react-dom";

interface Props {
    children?: ReactNode;
}

const { Form } = Tag;

const { out } = Action.sign;
const { initAction } = Action;

export default function Comp({ children }: Props): JSX.Element {
    const [_, onAction] = useFormState(out, initAction);
    return (
        <Form onAction={onAction}>
            <button type={"submit"}>{children}</button>
        </Form>
    );
}

"use client";

import Tag from "@tag";
import { JSX } from "react";
import { useFormState, useFormStatus } from "react-dom";
import onSignUp from "./onSignUp";

interface Props {}

const { Input, Button, Hr, Form } = Tag;

const Comp = ({}: Props): JSX.Element => {
    const { pending } = useFormStatus();
    const [state, onAction] = useFormState(onSignUp, undefined);

    return (
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
    );
};

export default Comp;

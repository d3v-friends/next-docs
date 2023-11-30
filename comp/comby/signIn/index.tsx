import { ReactNode, JSX } from "react";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import css from "./index.module.scss";

type Props = {};

const Comp = ({}: Props): JSX.Element => {
    const signIn = async (data: FormData) => {
        "use server";
        const username = data.get("username") || "";
        const password = data.get("password") || "";
    };

    const { pending } = useFormStatus();

    return (
        <form action={signIn} aria-disabled={pending}>
            <input type="text" name="username" placeholder="username" />
            <input type="password" name="password" placeholder="password" />
            <button type="submit">Sign In</button>
            <button type="button">Sign Up</button>
        </form>
    );
};

export default Comp;

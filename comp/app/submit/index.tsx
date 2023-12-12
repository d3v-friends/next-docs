import Loading from "@block/loading";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface Props {
    className?: string;
    children?: ReactNode;
}

export default function Comp({ children, className }: Props) {
    className = className || "";
    const { pending } = useFormStatus();
    return (
        <>
            <button className={className} disabled={pending} aria-disabled={pending}>
                {children}
            </button>
            <Loading pending={pending} />
        </>
    );
}

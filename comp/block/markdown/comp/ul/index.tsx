import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export default function Comp({ children }: Props) {
    return <ul className="mb-100">{children}</ul>;
}

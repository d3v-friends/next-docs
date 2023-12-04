import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    params: {
        slug: string[];
    };
}



export default function Comp({ children }: Props) {
    return <>{children}</>;
}

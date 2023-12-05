import { ReactNode, JSX } from "react";

interface Props {
    children?: ReactNode;
    params: {
        slug: string[];
    };
}

export default async function Comp({ children }: Props): Promise<JSX.Element> {
    return <>{children}</>;
}

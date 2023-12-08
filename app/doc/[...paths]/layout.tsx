import { JSX, ReactNode } from "react";

type Props = { children?: ReactNode };

export default async function Layout({ children }: Props): Promise<JSX.Element> {
    return <>{children}</>;
}

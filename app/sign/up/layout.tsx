import { Metadata } from "next";
import { JSX, ReactNode } from "react";

type Props = {
    children?: ReactNode;
    params: {}
};

const Layout = async ({ children, params }: Props): Promise<JSX.Element> => {
    return (
        <>
            <div>{children}</div>
        </>
    );
};

export default Layout;

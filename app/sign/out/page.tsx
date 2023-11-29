import { JSX, ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

const comp = async ({ children }: Props): Promise<JSX.Element> => {
    return (
        <>
            <div>{children}</div>
        </>
    );
};

export default comp;

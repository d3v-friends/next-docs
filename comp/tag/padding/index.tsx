import { ReactNode, JSX } from "react";

interface Props {
    children: ReactNode;
    padding?: {
        paddingLeft?: number;
        paddingRight?: number;
        paddingTop?: number;
        paddingBottom?: number;
    };
}

const Comp = async ({ children, padding }: Props): Promise<JSX.Element> => {
    let { paddingBottom, paddingTop, paddingRight, paddingLeft } = padding || {};
    paddingBottom = paddingBottom || 0;
    paddingTop = paddingTop || 0;
    paddingRight = paddingRight || 0;
    paddingLeft = paddingLeft || 0;
    return (
        <div
            style={{
                paddingTop,
                paddingBottom,
                paddingLeft,
                paddingRight,
            }}>
            {children}
        </div>
    );
};

export default Comp;

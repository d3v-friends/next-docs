"use client";
import { JSX, ReactNode, useCallback, useEffect, useState } from "react";

type Props = {
    children?: ReactNode;
};

const Comp = ({ children }: Props): JSX.Element => {
    const [y, setY] = useState(0);

    useEffect(() => {
        const listener: EventListener = ev => {
            setY.bind(this)(window.scrollY);
        };
        window.addEventListener("scroll", listener);
        return () => {
            window.removeEventListener("scroll", listener);
        };
    }, []);

    return (
        <>
            <div style={{ height: y }}></div>
            {children}
        </>
    );
};

export default Comp;

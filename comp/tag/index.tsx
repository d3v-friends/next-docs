import { ReactNode } from "react";
import H from "./h";
import P from "./p";
import Form from "./form";
import Input from "./input";
import Button from "./button";
import Hr from "./hr";
import Space from "./space";
import Link from "./link";

type HArgs = {
    align?: "left" | "center" | "right";
    children?: ReactNode;
    className?: string;
};

type PArgs = {
    hover?: boolean;
    children?: ReactNode;
};

const Tag = {
    H,
    H1: ({ align, children, className }: HArgs) => H({ align, children, className, size: 1 }),
    H2: ({ align, children, className }: HArgs) => H({ align, children, className, size: 2 }),
    H3: ({ align, children, className }: HArgs) => H({ align, children, className, size: 3 }),
    H4: ({ align, children, className }: HArgs) => H({ align, children, className, size: 4 }),
    H5: ({ align, children, className }: HArgs) => H({ align, children, className, size: 5 }),
    H6: ({ align, children, className }: HArgs) => H({ align, children, className, size: 6 }),
    P,
    P1: ({ hover, children }: PArgs) => P({ hover, children, size: 1 }),
    P2: ({ hover, children }: PArgs) => P({ hover, children, size: 2 }),
    P3: ({ hover, children }: PArgs) => P({ hover, children, size: 3 }),
    Form,
    Input,
    Button,
    Hr,
    Space,
    Link,
};

export default Tag;

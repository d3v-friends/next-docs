import { ReactNode } from "react";
import H from "./h";
import P from "./p";
import Input from "./input";
import Button from "./button";
import Hr from "./hr";
import Space from "./space";
import Link from "./link";
import Form from "./form";
import Divider from "./divider";
import Tooltip from "./tooltip";
import Inline from "./inline";
import ImgText from "./imgText";
import Debug from "./debug";
import Padding from "./padding";

type HArgs = {
    align?: "left" | "center" | "right";
    children?: ReactNode;
    className?: string;
    padding?: {
        t?: number;
        b?: number;
        l?: number;
        r?: number;
    };
};

type PArgs = {
    hover?: boolean;
    children?: ReactNode;
};

const Tag = {
    H,
    H1: ({ align, children, className, padding }: HArgs) => H({ align, children, className, padding, size: 1 }),
    H2: ({ align, children, className, padding }: HArgs) => H({ align, children, className, padding, size: 2 }),
    H3: ({ align, children, className, padding }: HArgs) => H({ align, children, className, padding, size: 3 }),
    H4: ({ align, children, className, padding }: HArgs) => H({ align, children, className, padding, size: 4 }),
    H5: ({ align, children, className, padding }: HArgs) => H({ align, children, className, padding, size: 5 }),
    H6: ({ align, children, className, padding }: HArgs) => H({ align, children, className, padding, size: 6 }),
    P,
    P1: ({ hover, children }: PArgs) => P({ hover, children, size: 1 }),
    P2: ({ hover, children }: PArgs) => P({ hover, children, size: 2 }),
    P3: ({ hover, children }: PArgs) => P({ hover, children, size: 3 }),
    Input,
    Button,
    Hr,
    Space,
    Link,
    Form,
    Divider,
    Tooltip,
    Inline,
    ImgText,
    Debug,
    Padding,
};

export default Tag;

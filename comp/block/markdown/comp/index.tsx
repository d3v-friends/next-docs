import { Components } from "react-markdown";
import css from "./index.module.scss";
import Code from "./code";
import CheckBox from "./checkbox";
import Li from "./li";
import Ul from "./ul";

const Comp: Components = {
    code: ({ children, className }) => {
        const code = children as string;
        const language = getLanguage(className || "");
        return <Code language={language}>{code}</Code>;
    },
    a: ({ href, children }) => (
        <a href={href} target="_blank">
            {children}
        </a>
    ),
    input: ({ children, type, checked }) => {
        switch (type) {
            case "checkbox":
                return <CheckBox checked={checked} />;
            default:
                return <input type={type} checked={checked} children={children} />;
        }
    },
    ul: ({ children }) => {
        return <Ul>{children}</Ul>;
    },
    li: ({ children }) => {
        return <Li>{children}</Li>;
    },
    h1: ({ children }) => {
        return <h1 className={css.h1}>{children}</h1>;
    },
    h2: ({ children }) => {
        return <h2 className={css.h2}>{children}</h2>;
    },
};

const getLanguage = (str: string): string => {
    const langLs = (str || "").split("-");
    if (langLs.length != 2) return "";
    return langLs[1];
};

export default Comp;

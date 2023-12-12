import blockUtil from "@block/blockUtil";
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
        return <h1 className={blockUtil.merge(css.h1, "mb-100")}>{children}</h1>;
    },
    h2: ({ children }) => {
        return <h2 className={blockUtil.merge(css.h2, "mb-100")}>{children}</h2>;
    },
    h3: ({ children }) => {
        return <h3 className="mb-50">{children}</h3>;
    },
    h4: ({ children }) => {
        return <h4 className="mb-50">{children}</h4>;
    },
    h5: ({ children }) => {
        return <h5 className="mb-50">{children}</h5>;
    },
    h6: ({ children }) => {
        return <h6 className="mb-50">{children}</h6>;
    },
    hr: () => <hr className="mb-600"/>
};

const getLanguage = (str: string): string => {
    const langLs = (str || "").split("-");
    if (langLs.length != 2) return "";
    return langLs[1];
};

export default Comp;

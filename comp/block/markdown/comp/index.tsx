import svg from "@svg/index";
import { Components } from "react-markdown";
import Code from "react-syntax-highlighter";
import { obsidian } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Header from "./header";
import Mermaid from "./mermaid";
import CheckBox from "@block/checkbox";
import Icon from "@block/icon";

const Comp: Components = {
    code: ({ children, className }) => {
        const code = children as string;
        const language = getLanguage(className || "");

        if (!Code.supportedLanguages.includes(language)) {
            switch (language) {
                case "mermaid":
                    return (
                        <>
                            <Header code={code}>{language}</Header>
                            <Mermaid>{code}</Mermaid>
                        </>
                    );
                default:
                    break;
            }
        }

        return (
            <>
                <Header code={code}>{language}</Header>
                <Code wrapLines={true} showLineNumbers={true} style={obsidian} language={language}>
                    {code}
                </Code>
            </>
        );
    },
    a: ({ href, content, children }) => {
        let src = svg.primary.link;
        if ((href || "").startsWith("mail")) {
            src = svg.primary.mail;
        }
        return (
            <a href={href} target="_blank">
                <Icon src={src}>{content}</Icon>
            </a>
        );
    },
    input: ({ children, disabled, type, checked }) => {
        switch (type) {
            case "checkbox":
                return <CheckBox checked={checked}>{children}</CheckBox>;
            default:
                return (
                    <input type={type} disabled={disabled || false} checked={checked}>
                        {children}
                    </input>
                );
        }
    },
    ul: ({ children }) => {
        return <ul>{children}</ul>;
    },
    h1: ({ children }) => <h1>{children}</h1>,
};

const getLanguage = (str: string): string => {
    const langLs = (str || "").split("-");
    if (langLs.length != 2) return "";
    return langLs[1];
};

export default Comp;

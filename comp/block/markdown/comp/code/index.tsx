import Header from "@block/markdown/comp/code/header";
import Code from "react-syntax-highlighter";
import Mermaid from "./mermaid";
import { obsidian } from "react-syntax-highlighter/dist/esm/styles/hljs";
import css from "./index.module.scss";

type Props = {
    language?: string;
    children?: string;
};

const { supportedLanguages } = Code;

export default function Comp({ children, language }: Props) {
    children = children || "";
    language = language || "";

    if (!supportedLanguages.includes(language)) {
        switch (language) {
            case "mermaid":
                return (
                    <>
                        <Header noCopy>{language}</Header>
                        <Mermaid>{children}</Mermaid>
                        <div className="height-400" />
                    </>
                );
        }
    }

    return (
        <>
            <Header code={children}>{language}</Header>
            <div className={css.cont}>
                <Code wrapLines={true} showLineNumbers={true} style={obsidian} language={language}>
                    {children}
                </Code>
            </div>
            <div className="height-400" />
        </>
    );
}

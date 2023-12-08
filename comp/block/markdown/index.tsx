import cutil from "@cutil";
import Tags from "@tag/index";
import LangHeader from "./langHeader";
import Image from "next/image";
import Markdown from "react-markdown";
import { Components } from "react-markdown";
import gfm from "remark-gfm";
import Code from "react-syntax-highlighter";
import { obsidian } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Events from "@event/index";
import css from "./index.module.scss";
import Checkbox from "./checkbox";
import Del from "./del";
import { JSX } from "react";
import Mermaid from "./mermaid";
import IconPrimary from "@block/icon/svg/primary";
// # todo: icon 모두 변경하기 -> 필터쓰지 않도록!!

const { ImgText, H, P, Hr } = Tags;
const { merge } = cutil;
const { OnCopy } = Events;

const MdComps: Components = {
    code: ({ children, className }) => {
        const langLs = (className || "").split("-");
        if (langLs.length != 2) return <div>{children}</div>;

        const language = langLs[1];
        if (Code.supportedLanguages.findIndex(v => v === language) === -1) {
            switch (language) {
                case "mermaid":
                    return (
                        <>
                            <LangHeader language={`${language.toUpperCase()}`}>
                                <OnCopy value={children as string}>
                                    <ImgText src={IconPrimary.Copy}>Copy</ImgText>
                                </OnCopy>
                            </LangHeader>
                            <Mermaid>{children as string}</Mermaid>
                        </>
                    );
                default:
                    return (
                        <div>
                            <LangHeader language={`${language.toUpperCase()} - unsupported highlight`}>
                                <OnCopy value={children as string}>
                                    <ImgText src={IconPrimary.Copy}>Copy</ImgText>
                                </OnCopy>
                            </LangHeader>
                            <Code wrapLines={true} showLineNumbers={true} style={obsidian} language={language}>
                                {children as string}
                            </Code>
                        </div>
                    );
            }
        }
        return (
            <>
                <LangHeader language={language.toUpperCase()}>
                    <OnCopy value={children as string}>
                        <ImgText src={IconPrimary.Copy}>Copy</ImgText>
                    </OnCopy>
                </LangHeader>
                <Code wrapLines={true} showLineNumbers={true} style={obsidian} language={language}>
                    {children as string}
                </Code>
            </>
        );
    },
    a: ({ href, content, children }) => {
        let src = IconPrimary.Link;

        if ((href || "").startsWith("mail")) {
            src = IconPrimary.Mail;
        }

        return (
            <a className={css.a} href={href} target="_blank">
                <Image className={merge(css.img)} src={src} alt={"link"} width={20} height={20} />
                {children}
            </a>
        );
    },
    ul: ({ children }) => {
        return <ul className={css.ul}>{children}</ul>;
    },
    input: ({ children, disabled, type, checked }) => {
        switch (type) {
            case "checkbox":
                return <Checkbox checked={checked}>{children}</Checkbox>;
            default:
                return (
                    <input type={type} disabled={disabled || false} checked={checked}>
                        {children}
                    </input>
                );
        }
    },
    pre: ({ children }) => <pre className={css.pre}>{children}</pre>,
    h1: ({ children }) => (
        <H size={1} className={merge(css.large, css.hBorderBottom, css.colorPrimary)}>
            {children}
        </H>
    ),
    h2: ({ children }) => (
        <H size={2} className={merge(css.large, css.colorPrimary)}>
            {children}
        </H>
    ),
    h3: ({ children }) => (
        <H size={3} className={merge(css.medium)}>
            {children}
        </H>
    ),
    h4: ({ children }) => (
        <H size={4} className={merge(css.medium)}>
            {children}
        </H>
    ),
    h5: ({ children }) => (
        <H size={5} className={merge(css.small)}>
            {children}
        </H>
    ),
    h6: ({ children }) => (
        <H size={6} className={merge(css.small)}>
            {children}
        </H>
    ),
    del: ({ children }) => <Del>{children}</Del>,
    p: ({ children }) => <P>{children}</P>,
    hr: () => <Hr />,
};

type Props = {
    children: string;
};

export default async function Comp({ children }: Props): Promise<JSX.Element> {
    return (
        <Markdown components={MdComps} remarkPlugins={[gfm]}>
            {children}
        </Markdown>
    );
}

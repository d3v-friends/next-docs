import fnCss from "@pure/fnCss";
import Image from "next/image";
import Markdown from "react-markdown";
import { Components } from "react-markdown";
import gfm from "remark-gfm";
import Code from "react-syntax-highlighter";
import { obsidian } from "react-syntax-highlighter/dist/esm/styles/hljs";
import OnCopy from "@comp/client/onCopy";
import LangHeader from "./langHeader";
import ImgText from "@pure/imgText";
import H from "@pure/tag-h";
import P from "@pure/tag-p";
import css from "./index.module.scss";

const { merge } = fnCss;

const MdComps: Components = {
    code: ({ children, className }) => {
        const langLs = (className || "").split("-");
        if (langLs.length != 2) return <div>{children}</div>;

        const language = langLs[1];
        if (Code.supportedLanguages.findIndex(v => v === language) === -1) {
            return (
                <div>
                    <LangHeader language={`${language.toUpperCase()} - unsupported highlight`}>
                        <OnCopy value={children as string}>
                            <ImgText size={16} src="/asset/img/svg/copy.svg">
                                Copy
                            </ImgText>
                        </OnCopy>
                    </LangHeader>
                    <Code wrapLines={true} showLineNumbers={true} style={obsidian} language={language}>
                        {children as string}
                    </Code>
                </div>
            );
        }
        return (
            <>
                <LangHeader language={language.toUpperCase()}>
                    <OnCopy value={children as string}>
                        <ImgText size={16} src="/asset/img/svg/copy.svg">
                            Copy
                        </ImgText>
                    </OnCopy>
                </LangHeader>
                <Code wrapLines={true} showLineNumbers={true} style={obsidian} language={language}>
                    {children as string}
                </Code>
            </>
        );
    },
    a: ({ href, content, children }) => {
        let src = "/asset/img/svg/link.svg";

        if ((href || "").startsWith("mail")) {
            src = "/asset/img/svg/mail.svg";
        }

        return (
            <a className={css.a} href={href} target="_blank">
                <Image className={merge(css.svgFilterSecondary, css.img)} src={src} alt={"link"} width={20} height={20} />
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
                let src = "/asset/img/svg/";
                src += checked ? "check_true.svg" : "check_false.svg";

                return (
                    <div className={css.input}>
                        <Image className={merge(css.svgFilterSecondary, css.svg)} width={50} height={50} src={src} alt={"check"} />
                        <div>{children}</div>
                    </div>
                );
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
        <H size="h1" className={merge(css.hBorderBottom, css.hLarge)}>
            {children}
        </H>
    ),
    h2: ({ children }) => (
        <H size="h2" className={merge(css.hLarge)}>
            {children}
        </H>
    ),
    h3: ({ children }) => (
        <H size="h3" className={merge(css.hLarge)}>
            {children}
        </H>
    ),
    h4: ({ children }) => (
        <H size="h4" className={merge(css.hSmall)}>
            {children}
        </H>
    ),
    h5: ({ children }) => (
        <H size="h5" className={merge(css.hSmall)}>
            {children}
        </H>
    ),
    h6: ({ children }) => (
        <H size="h6" className={merge(css.hSmall)}>
            {children}
        </H>
    ),
    del: ({ children }) => <del className={merge(css.del)}>{children}</del>,
    p: ({ children }) => <P>{children}</P>,
    hr: () => <div className={css.hr} />,
};

type Props = {
    children: string;
};

const Comp = async ({ children }: Props) => (
    <Markdown components={MdComps} remarkPlugins={[gfm]}>
        {children}
    </Markdown>
);

export default Comp;

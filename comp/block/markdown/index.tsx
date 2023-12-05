import cutil from "@cutil";
import Tag from "@tag";
import LangHeader from "./langHeader";
import Image from "next/image";
import Markdown from "react-markdown";
import { Components } from "react-markdown";
import gfm from "remark-gfm";
import Code from "react-syntax-highlighter";
import { obsidian } from "react-syntax-highlighter/dist/esm/styles/hljs";
import css from "./index.module.scss";

const { H1, H2, H3, H4, H5, H6, P1 } = Tag;

const { merge } = cutil;

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
    h1: ({ children }) => <H1 className={merge(css.large, css.hBorderBottom, css.colorPrimary)}>{children}</H1>,
    h2: ({ children }) => <H2 className={merge(css.large, css.colorPrimary)}>{children}</H2>,
    h3: ({ children }) => <H3 className={merge(css.medium)}>{children}</H3>,
    h4: ({ children }) => <H4 className={merge(css.medium)}>{children}</H4>,
    h5: ({ children }) => <H5 className={merge(css.small)}>{children}</H5>,
    h6: ({ children }) => <H6 className={merge(css.small)}>{children}</H6>,
    del: ({ children }) => <del className={merge(css.del)}>{children}</del>,
    p: ({ children }) => <P1>{children}</P1>,
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

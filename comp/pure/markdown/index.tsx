import Image from "next/image";
import Markdown from "react-markdown";
import { Components } from "react-markdown";
import gfm from "remark-gfm";
import Code from "react-syntax-highlighter";
import { obsidian } from "react-syntax-highlighter/dist/esm/styles/hljs";
import OnCopy from "@comp/client/onCopy";
import LangHeader from "./langHeader";
import ImgText from "@pure/imgText";
import fn from "@comp/index";
import css from "./index.module.scss";

const {
    css: { merge },
} = fn;

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
                        <Image className={merge(css.svgFilterSecondary, css.svg)} width={20} height={20} src={src} alt={"check"} />
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
    h1: ({ children }) => <h1 className={merge(css.colorPrimary, css.h1)}>{children}</h1>,
    h2: ({ children }) => <h2 className={merge(css.colorPrimary, css.h2)}>{children}</h2>,
    h3: ({ children }) => <h3 className={merge(css.colorPrimary, css.h3)}>{children}</h3>,
    h4: ({ children }) => <h4 className={merge(css.h4)}>{children}</h4>,
    h5: ({ children }) => <h5 className={merge(css.h5)}>{children}</h5>,
    h6: ({ children }) => <h6 className={merge(css.h6)}>{children}</h6>,
    del: ({ children }) => <del className={merge(css.del)}>{children}</del>,
    p: ({ children }) => <div className={merge(css.p)}>{children}</div>,
    hr: () => <div className={css.hr} />,
};

export default async function Comp({ children }: { children: string }) {
    return (
        <Markdown components={MdComps} remarkPlugins={[gfm]}>
            {children}
        </Markdown>
    );
}

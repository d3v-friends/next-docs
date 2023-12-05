import { ReactNode } from "react";
import css from "./index.module.scss";

type Props = {
    language: string;
    children?: ReactNode;
};

export default function Comp({ children, language }: Props): ReactNode {
    return (
        <div className={css.cont}>
            <div className={css.language}>{language}</div>
            <div className={css.flexGrow} />
            <div>{children}</div>
        </div>
    );
}

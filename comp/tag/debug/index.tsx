import fnCss from "@fn/css";
import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

type Props = {
    data: { key: string; value: string }[];
    children?: ReactNode;
};

export default function Comp({ children, data }: Props): JSX.Element {
    return (
        <div className={css.cont}>
            <div>{children}</div>
            <div>
                {data.map((v, i) => (
                    <div className={css.kvCont} key={i}>
                        <div>{v.key}</div>
                        <div className={fnCss.merge(css.flexGrow)} />
                        <div>{v.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

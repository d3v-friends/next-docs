import { ReactNode } from "react";
import css from "./index.module.scss";

type Props = {
    notMobile: ReactNode;
    mobile: ReactNode;
};

export default function Comp({ notMobile, mobile }: Props) {
    return (
        <>
            <div className={css.mobile}>{mobile}</div>
            <div className={css.notMobile}>{notMobile}</div>
        </>
    );
}

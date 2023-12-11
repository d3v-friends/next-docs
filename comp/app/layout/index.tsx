import blockUtil from "@block/blockUtil";
import moment from "moment/moment";
import { ReactNode } from "react";
import Footer from "@app/footer";
import Top from "./top";
import Side from "./side";
import css from "./index.module.scss";

type Props = {
    logo?: ReactNode;
    children?: ReactNode;
};

export default function Comp({ children, logo }: Props) {
    return (
        <>
            <div className={css.cont}>
                <Top logo={logo} />
                <div className={blockUtil.merge(css.content, "pb-200")}>
                    <div className={css.side}>
                        <Side />
                    </div>
                    <div className={css.children}>{children}</div>
                </div>
            </div>
            <Footer since={moment("1987-09-24").toDate()} name="Ciao Lee" />
        </>
    );
}

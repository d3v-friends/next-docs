import { ReactNode } from "react";
import css from "./index.module.scss";
import Content from "./content";
import Logo from "./logo";

type Props = {
    logo?: ReactNode;
};
export const dynamic = "force-dynamic";

export default function Comp({ logo }: Props) {
    return (
        <>
            <nav className={css.nav}>
                <div className={css.cont}>
                    <div className={css.logo}>
                        <Logo>{logo}</Logo>
                    </div>
                    <div className={css.children}>
                        <Content />
                    </div>
                </div>
            </nav>
            <div className={css.padding}></div>
        </>
    );
}

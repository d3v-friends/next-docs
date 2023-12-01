import { ReactNode } from "react";
import css from "./index.module.scss";

type IFormArgs = {
    action: (data: FormData) => void;
    children?: ReactNode;
};

const Comp = ({ action, children }: IFormArgs) => (
    <form className={css.form} action={action}>
        {children}
    </form>
);

export default Comp;

import moment from "moment";
import { ReactNode } from "react";
import css from "./index.module.scss";

type Props = {
    since: string;
    name: string;
};

export default function Comp({ since, name }: Props): ReactNode {
    return (
        <div className={css.cont}>
            Since {moment(since).format("yyyy")} @powered by {name}
        </div>
    );
}

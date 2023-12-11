import blockUtil from "@block/blockUtil";
import moment from "moment/moment";
import css from "./index.module.scss";

type Props = {
    since: Date;
    name: string;
};

export default function Comp({ since, name }: Props) {
    return (
        <div className={blockUtil.merge(css.cont)}>
            <div className={css.info}>
                since {moment(since).format("yy")} @ powered by {name}
            </div>
        </div>
    );
}

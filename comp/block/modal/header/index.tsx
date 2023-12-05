import Comps from "@comp";
import { ReactNode, JSX } from "react";
import Image from "next/image";
import css from "./index.module.scss";

interface Props {
    onOff: Function;
    children?: ReactNode;
}

const {
    Tooltip,
    IconPack: { Secondary },
} = Comps;

const Comp = ({ children, onOff }: Props): JSX.Element => (
    <div className={css.cont}>
        <div className={css.header}>{children}</div>
        <Tooltip tooltip={"close"} loc={"left"}>
            <Image className={css.close} src={Secondary.Manage} alt={"close"} width={30} height={30} onClick={() => onOff()} />
        </Tooltip>
    </div>
);

export default Comp;

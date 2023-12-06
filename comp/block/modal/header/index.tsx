import Tags from "@tag/index";
import { ReactNode, JSX } from "react";
import Image from "next/image";
import css from "./index.module.scss";
import IconPack from "@block/icon/svg";

interface Props {
    onOff: Function;
    children?: ReactNode;
}

const { Tooltip } = Tags;
const { Secondary } = IconPack;

const Comp = ({ children, onOff }: Props): JSX.Element => (
    <div className={css.cont}>
        <div className={css.header}>{children}</div>
        <div>
            <Tooltip tooltip={"close"} loc={"left"}>
                <Image className={css.close} src={Secondary.Close} alt={"close"} width={30} height={30} onClick={() => onOff()} />
            </Tooltip>
        </div>
    </div>
);

export default Comp;

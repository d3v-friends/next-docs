import imgSrc from "@client/onModal/header/close.svg";
import Tooltip from "@pure/tooltip";
import Image from "next/image";
import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

interface Props {
    onOff: Function;
    children?: ReactNode;
}

const Comp = ({ children, onOff }: Props): JSX.Element => {
    return (
        <div className={css.cont}>
            <div className={css.header}>{children}</div>
            <Tooltip tooltip={"close"} loc={"left"}>
                <Image className={css.close} src={imgSrc} alt={"close"} width={30} height={30} onClick={() => onOff()} />
            </Tooltip>
        </div>
    );
};

export default Comp;

import Image from "next/image";
import css from "./index.module.scss";
import svg from "@svg/index";

type Props = {
    checked?: boolean;
};
const {
    primary: { checkTrue, checkFalse },
} = svg;

export default function Comp({ checked }: Props) {
    const src = checked ? checkTrue : checkFalse;
    return <Image className={css.img} src={src} alt={src} width={20} height={20} />;
}

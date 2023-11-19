import { ReactNode } from "react";
import styles from "./index.module.scss";

export default function Comp(props: { children: ReactNode }) {
    return <div className={styles.container}>{props.children}</div>;
}

"use client";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import css from "./index.module.scss";

export default function Comp(): ReactNode {
    const handler = () => {
        window.scrollTo({ top: 0 });
    };

    const [top, setTop] = useState(0);
    const setTopListener = () => {
        setTop(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", setTopListener);
        return () => {
            window.removeEventListener("scroll", setTopListener);
        };
    }, []);

    const isShow = 100 < top;
    return (
        <>
            {isShow && (
                <div className={css.cont} onClick={handler}>
                    <Image width={30} height={30} className={css.svgFilterBg} src={"/asset/img/svg/up.svg"} alt={"top"} />
                </div>
            )}
        </>
    );
}

"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, JSX } from "react";
import css from "./index.module.scss";

interface Props {
    fileList: string[];
}

const Comp = async ({ fileList }: Props): Promise<JSX.Element> => {
    const pathname = usePathname();
    return (
        <div>
            <h1>{pathname}</h1>
        </div>
    );
};

export default Comp;

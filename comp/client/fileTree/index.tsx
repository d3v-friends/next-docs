"use client";
import fnUrl from "@pure/fnUrl";
import { usePathname } from "next/navigation";
import { ReactNode, JSX } from "react";
import H from "@pure/tag-h";

type Props = {
    id: string;
    fileList: string[];
    children?: ReactNode;
};

const Comp = ({ id, children, fileList }: Props): JSX.Element => {
    const wd = fnUrl.path(usePathname());
    const childDirs = fnUrl.childDir(wd, fileList);

    return (
        <div id={id}>
            <H size="h6">file_tree</H>

            <H size="h6">file_list</H>
            {fileList.map((v, i) => (
                <div key={i}>{v}</div>
            ))}
            <div>{children}</div>
        </div>
    );
};

const Path = () => {};

export default Comp;

"use client";
import { MDIndex } from "@fn/md";
import { useRouter } from "next/navigation";
import { JSX } from "react";
import FileList from "@block/filelist";

type Props = {
    fileList: MDIndex[];
};

export default function Comp({ fileList }: Props): JSX.Element {
    const router = useRouter();
    const onClick = (md: MDIndex) => router.push(`/doc/${md.path}`);
    return <FileList fileList={fileList} onClick={onClick} />;
}

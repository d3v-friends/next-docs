"use client";
import Blocks from "@block/index";
import { IndexTree } from "@fn/type";
import Tags from "@tag/index";
import { usePathname, useRouter } from "next/navigation";
import { JSX, useState } from "react";
import css from "./index.module.scss";

type Props = {
    idx: IndexTree & {
        extend?: boolean;
    };
};

const { IconPrimary } = Blocks;
const { ImgText } = Tags;
const leftPadding = 10;

const Dir = ({
    idx,
    depth,
}: Props & {
    depth: number;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [extend, setExtend] = useState(!!idx.extend);
    const children: IndexTree[] = [];
    for (let key in idx.children) {
        children.push(idx.children[key]);
    }
    const onClickDoc = (path: string) => {
        router.push(`/doc/${path}`);
    };

    const onActive = (fp: string): boolean => {
        fp = `/doc${fp}`;
        return pathname === fp;
    };
    return (
        <div style={{ paddingLeft: depth * leftPadding }}>
            <div onClick={() => setExtend(!extend)}>
                <ImgText src={extend ? IconPrimary.DirDown : IconPrimary.Dir}>{idx.basename}</ImgText>
            </div>

            {extend && children.map((v, i) => <Dir key={i} idx={v} depth={depth + 1} />)}

            {extend && (
                <div style={{ paddingLeft: (depth + 1) * leftPadding }}>
                    {idx.fileList.map((v, i) => (
                        <div key={i} onClick={() => onClickDoc(v.path)}>
                            <ImgText className={onActive(v.path) ? css.filename : ""} src={IconPrimary.File}>
                                {}
                                {v.alias}
                            </ImgText>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Comp({ idx }: Props): JSX.Element {
    return <Dir idx={idx} depth={0} />;
}

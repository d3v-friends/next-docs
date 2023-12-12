"use client";
import blockUtil from "@block/blockUtil";
import { IndexTree } from "@fn/type";
import { usePathname, useRouter } from "next/navigation";
import { JSX, useState } from "react";
import css from "./index.module.scss";
import primary from "@svg/primary";
import Icon from "@block/icon";

type Props = {
    idx: IndexTree & {
        extend?: boolean;
    };
};

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
        <div className={css.cont} style={{ paddingLeft: depth * leftPadding }}>
            <div onClick={() => setExtend(!extend)}>
                <Icon className={css.filename} src={extend ? primary.dirDown : primary.dir} isText>
                    {idx.basename}
                </Icon>
            </div>

            {extend && children.map((v, i) => <Dir key={i} idx={v} depth={depth + 1} />)}

            {extend && (
                <div style={{ paddingLeft: (depth + 1) * leftPadding }}>
                    {idx.fileList.map((v, i) => (
                        <div key={i} onClick={() => onClickDoc(v.path)}>
                            <Icon isText className={blockUtil.merge(onActive(v.path) ? css.active : "", css.filename)} src={primary.file}>
                                {v.alias}
                            </Icon>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Comp({ idx }: Props): JSX.Element {
    return (
        <>
            <Dir idx={idx} depth={0} />
            <div className="mb-50" />
        </>
    );
}

"use client";
import Tag from "@tag/index";
import { JSX, useEffect, useState } from "react";
import { MDIndex } from "@fn/md";
import css from "./index.module.scss";

type Props = {
    fileList: MDIndex[];
    initShow?: boolean;
    onClick?: (md: MDIndex) => void;
    children?: JSX.Element;
};

const { Input, Button, Space, Tooltip } = Tag;

export default function Comp({ children, fileList, onClick, initShow }: Props): JSX.Element {
    const [ls, setLs] = useState(initShow ? fileList : []);
    const [finder, setFinder] = useState("");

    const onEnter = () => {
        if (finder === "") return;

        const found = fileList.filter(v => {
            if (v.name.includes(finder)) return true;
            if (v.path.includes(finder)) return true;
            return false;
        });

        setLs(found);
    };

    const onReset = () => {
        setLs([]);
        setFinder("");
    };

    const onClickFilename = (md: MDIndex) => {
        if (!onClick) return;
        onClick(md);
    };

    return (
        <>
            <Space height="0.5rem" />
            <Input
                placeholder="finder"
                onEnter={onEnter}
                type="text"
                name="finder"
                value={finder}
                onChange={ev => setFinder(ev.target.value)}
            />
            <div className={css.contButton}>
                <Button onClick={onReset} style="outline">
                    Reset
                </Button>
                <Button onClick={onEnter}>Find</Button>
            </div>
            <div>{children}</div>
            {ls.map((v, i) => (
                <div>
                    <div className={css.inlineBlock} key={i} onClick={() => onClickFilename(v)}>
                        <Tooltip className={css.filename} tooltip={v.path} key={i} loc="right">
                            {v.name}
                        </Tooltip>
                    </div>
                </div>
            ))}
            {ls.length === 0 && <div className={css.notFound}>no files</div>}
        </>
    );
}

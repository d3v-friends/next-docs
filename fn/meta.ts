import fnEnv from "@fn/env";
import { Metadata } from "next";

function simple(...strs: string[]): Metadata {
    let r = "";
    for (const elem of strs) {
        r += `${elem}`;
    }
    return {
        title: `${fnEnv.string("MT_PREFIX", "next-docs")}:${r}`,
    };
}

const fnMeta = {
    simple,
};

export default fnMeta;

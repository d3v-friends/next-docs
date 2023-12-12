import fnEnv from "@fn/env";

function simple(v: string): string {
    const title = fnEnv.string("MT_TITLE", "next-docs");
    return `${title} :: ${v}`;
}

const fnMeta = {
    simple,
};

export default fnMeta;

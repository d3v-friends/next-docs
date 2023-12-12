import fnEnv from "@fn/env";

function getTitle(): string {
    return fnEnv.string("MT_TITLE", "next-docs");
}

function simple(v: string): string {
    const title = getTitle();
    return `${title} :: ${v}`;
}

const fnMeta = {
    getTitle,
    simple,
};

export default fnMeta;

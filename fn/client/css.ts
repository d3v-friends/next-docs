const merge = (...str: string[]): string => {
    let res = "";
    for (const v of str) {
        res += `${v} `;
    }
    res = res.slice(0, res.length - 1);
    return res;
};

const fnCss = {
    merge,
};

export default fnCss;

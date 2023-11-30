const fnCss = {
    merge: (...str: string[]): string => {
        let res = "";
        for (const v of str) {
            res += `${v} `;
        }
        res = res.slice(0, res.length - 1);
        return res;
    },
    chain: (v: any): any => v,
};

export default fnCss;

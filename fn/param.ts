const boolean = (v: boolean[]): boolean => {
    if (v.length === 0) return false;
    return v[0];
};
const string = (v: string[]): string => {
    if (v.length === 0) return "";
    return v[0];
};

const strComma = (keys: string[], suffix: string): string => {
    const parent = string(keys);
    if (parent === "") {
        return suffix;
    }

    return `${parent}.${suffix}`;
};

const commaToArray = (str: string): string[] => {
    return str
        .split(",")
        .filter(v => v !== "")
        .map(v => v.trim());
};

const arrayToComma = (ls: string[]): string => {
    let res = "";
    for (let elem of ls) {
        if (elem === "") continue;
        res += `${elem},`;
    }
    return res.slice(0, res.length - 1);
};

const fnParam = {
    string,
    boolean,
    strComma,
    commaToArray,
    arrayToComma,
};

export default fnParam;

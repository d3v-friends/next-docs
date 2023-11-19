const param = {
    boolean: (v: boolean[]): boolean => {
        if (v.length === 0) return false;
        return v[0];
    },
};

export default param;

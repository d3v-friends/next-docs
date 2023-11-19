const fn = {
    env: {
        string: (key: string): string => {
            const value = process.env["key"] || "";
            if (value == "") {
                console.log(`not found env: key=${key}`);
                process.exit(1);
            }
            return value;
        },
        boolean: (key: string): boolean => {
            return "true" === fn.env.string(key);
        },
        int: (key: string): number => {
            return parseInt(fn.env.string(key));
        },
    },
    param: {
        boolean: (v: boolean[]): boolean => {
            if (v.length === 0) return false;
            return v[0];
        },
    },
};

export default fn;

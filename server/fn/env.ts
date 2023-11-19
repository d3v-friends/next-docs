const env = {
    string: (key: string): string => {
        const value = process.env["key"] || "";
        if (value == "") {
            console.log(`not found env: key=${key}`);
            process.exit(1);
        }
        return value;
    },
    boolean: (key: string): boolean => {
        return "true" === env.string(key);
    },
    int: (key: string): number => {
        return parseInt(env.string(key));
    },
};

export default env;

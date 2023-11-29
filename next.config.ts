import { NextConfig } from "next";
import path from "path";

const config: NextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, "comp")],
    },
    // webpack: (config, options) => {
    //     return config;
    // },
    typescript: {
        tsconfigPath: "tsconfig.json",
    },
};

module.exports = config;

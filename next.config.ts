import { NextConfig } from "next";
import path from "path";

const config: NextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, "comp"), path.join(__dirname, "app")],
    },
    typescript: {
        tsconfigPath: "tsconfig.json",
    },
};

module.exports = config;

import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
    preset: "ts-jest",
    testEnvironment: "node",
    testRegex: "^.+_test.(ts|tsx|js)$",
    moduleNameMapper: {
        "^@comp/(.*)$": "<rootDir>/comp/$1",
    },
};

export default config;

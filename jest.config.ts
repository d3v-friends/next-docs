import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
    preset: "ts-jest",
    testEnvironment: "node",
    testRegex: "^.+_test.(ts|tsx|js)$",
    moduleNameMapper: {
        "^@fn/(.*)$": "<rootDir>/fn/$1",
    },
};

export default config;

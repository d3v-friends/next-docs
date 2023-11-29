"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var config = {
    sassOptions: {
        includePaths: [path_1.default.join(__dirname, "comp"), path_1.default.join(__dirname, "app")],
    },
    typescript: {
        tsconfigPath: "tsconfig.json",
    },
};
module.exports = config;

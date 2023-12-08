import fnEnv from "@fn/env";
import fnMD from "@fn/md";
import { beforeAll, describe, test } from "@jest/globals";

describe("fnMd", () => {
    beforeAll(async () => {
        await fnEnv.readFile(".env.local");
    });
    test("indexing", async () => {
        await fnMD.idx.create();
    });
});

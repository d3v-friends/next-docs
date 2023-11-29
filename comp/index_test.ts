import fn from "@comp/index";
import { beforeAll, describe, test } from "@jest/globals";

describe("index.ts", () => {
    beforeAll(async () => {
        await fn.env.read(__dirname, "..", ".env.local");
        console.log(fn.env.string("ROOT_PATH"));
    });

    test("indexing", async () => {
        const ls = await fn.indexMD.run();
        console.log(ls);
    });
});

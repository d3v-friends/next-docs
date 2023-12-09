import regexp from "@fn/regexp";
import fnSign from "@fn/sign";
import { describe, test, expect } from "@jest/globals";

describe("sign", () => {
    test("regex, password", async () => {
        const res = regexp.password.test("Ciao!123");
        expect(res).toBe(true);
    });
});

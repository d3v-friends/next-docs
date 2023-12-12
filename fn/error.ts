type MsgKey = "key" | "ko" | "en";
type Msg = Record<MsgKey, string>;
type ErrorTree = { [key: string]: Msg | ErrorTree };

const error: ErrorTree = {
    account: {
        duplicate: {
            key: "account.duplicate",
            ko: "중복된 아이디가 있습니다.",
            en: "duplicated account",
        },
    },
};

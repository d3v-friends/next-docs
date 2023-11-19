import { Schema } from "mongoose";
import mongo from "@server/mongo";

interface Account {
    isActivate: Boolean;
    identifier: Map<string, string>;
    verifier: Map<string, Verifier>;
    property: Map<string, string>;
}

export type Verifier = {
    key: string;
    value: string;
    mode: VerifierMode;
};

export type VerifierMode = "compare" | "otp";

const schema = new Schema<Account>(
    {
        isActivate: {
            type: Boolean,
            default: true,
        },
        identifier: {
            type: Schema.Types.Map,
            default: {},
        },
        verifier: {
            type: Schema.Types.Map,
            default: {},
        },
        property: {
            type: Schema.Types.Map,
            default: {},
        },
    },
    {
        timestamps: true,
    },
);

schema.index({
    isActivate: 1,
});

schema.index(
    {
        "identifier.username": 1,
    },
    {
        unique: true,
    },
);

const FnAccount = {
    create: async (i: {}): Account => {
        const client = await mongo.connect.byEnv();
        client.Model<Account>();
    },
};

export default Account;

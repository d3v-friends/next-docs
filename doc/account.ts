import BizMongo from "@server/mongo";
import { Schema } from "mongoose";

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

const def: BizMongo.Schema<Account> = {
  colNm: "accounts",
  schema: {
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
  options: {
    timestamps: true,
  },
  indexes: [
    {
      fields: {
        "identifier.username": 1,
      },
      options: {
        unique: true,
      }
    }
  ]
}

export default SchemaAccount;

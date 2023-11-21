import BizMongo from "@server/mongo";
import { Schema, Types } from "mongoose";

interface Session {
    isActivate: Boolean;
    accountId: Types.ObjectId;
    userAgent: String;
    ip: String;
    history: History[];
}

type History = {
    ip: String;
    userAgent: String;
    connAt: Date;
};

const def: BizMongo.Schema<Session> = {
    colNm: "sessions",
    schema: {
        isActivate: {
            type: Boolean,
            default: true,
        },
        accountId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        userAgent: {
            type: String,
            required: true,
        },
        ip: {
            type: String,
            required: true,
        },
        history: {
            type: [History],
            default: [],
        },
    },
    options: {
        timestamps: true,
    },
    indexes: [
        {
            fields: {
                _id: -1,
                isActivate: 1,
            },
            options: {
                unique: true,
            }
        },
        {
            fields: {
                accountId: 1,
            }
        }
    ]
};

export default SchemaSession;

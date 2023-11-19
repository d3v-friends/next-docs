import { Model, Schema, Types } from "mongoose";

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

const schema = new Schema<Session>(
    {
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
    {
        timestamps: true,
    },
);

schema.index(
    {
        _id: -1,
        isActivate: 1,
    },
    {
        unique: true,
    },
);

schema.index({
    accountId: 1,
});

const Session = new Model("sessions", schema);

export default Session;

import BizMongo from "@server/mongo";
import { Mongoose, Schema } from "mongoose";

interface Kv {
    _id: Schema.Types.ObjectId;
    key: String;
    value: String;
    createdAt: Date;
    updatedAT: Date;
}

const def: BizMongo.Schema<Kv> = {
    colNm: "kvs",
    schema: {
        key: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
    },
    options: {
        timestamps: true,
    },
    indexes: [
        {
            fields: {
                key: 1,
            },
            options: {
                unique: true,
            },
        },
    ],
};

const DocKv = {
    async set(client: Mongoose, key: string, value: string): Promise<Kv> {
        const model = BizMongo.model(client, def);
        const res = await model.updateOne(
            {
                key,
            },
            {
                value,
            },
            {
                upsert: true,
            },
        );
        return DocKv.get(client, key);
    },
    async get(client: Mongoose, key: string): Promise<Kv> {
        const model = BizMongo.model(client, def);
        const res = await model.findOne({
            key,
        });

        if (!res) throw new Error(`not found key_value: key=${key}`);

        return res;
    },
};

export default DocKv;

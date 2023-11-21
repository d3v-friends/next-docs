import fn, { Nullable } from "@server/fn";
import { FlatRecord, Schema as MongoSchema } from "mongoose";

import {
    IndexDefinition,
    IndexOptions,
    Mongoose,
    SchemaDefinition,
    SchemaDefinitionType,
    SchemaOptions,
    connect as conn,
    Model,
} from "mongoose";

class BizMongo {
    static client: Nullable<Mongoose> = null;

}

namespace BizMongo {
    let client: Mongoose | null;

    export type Schema<DATA> = {
        colNm: string;
        schema: SchemaDefinition<SchemaDefinitionType<DATA>, DATA>;
        indexes?: {
            fields: IndexDefinition;
            options?: IndexOptions;
        }[];
        options?: SchemaOptions<FlatRecord<DATA>>;
    };

    export const connect = {
        byEnv: (): Promise<Mongoose> =>
            connect.byValue({
                host: fn.env.string("MG_HOST"),
                username: fn.env.string("MG_USERNAME"),
                password: fn.env.string("MG_PASSWORD"),
                database: fn.env.string("MG_DATABASE"),
            }),
        byValue: async (i: { host: string; username: string; password: string; database: string }): Promise<Mongoose> => {
            const client = await conn(`mongodb://${i.host}`, {
                user: i.username,
                pass: i.password,
                dbName: i.database,
            });
        },
    };

    export function model<DATA extends object>(client: Mongoose, schema: Schema<DATA>) {
        return client.model(schema.colNm, new MongoSchema(schema.schema, schema.options || {}));
    }
}

export default BizMongo;

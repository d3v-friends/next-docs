import { connect as conn, Mongoose } from "mongoose";
import fn from "@server/fn";

const mongo = {
    connect: {
        byEnv: (): Promise<Mongoose> => {
            return conn(`mongodb://${fn.env.string("MG_HOST")}`, {
                user: fn.env.string("MG_USERNAME"),
                pass: fn.env.string("MG_PASSWORD"),
                dbName: fn.env.string("MG_DATABASE"),
            });
        },
        byValue: (i: { host: string; username: string; password: string; database: string }): Promise<Mongoose> =>
            conn(`mongodb://${i.host}`, {
                user: i.username,
                pass: i.password,
                dbName: i.database,
            }),
    },
};

export default mongo;

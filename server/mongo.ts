import { connect as conn, Mongoose } from "mongoose";
import index from "@server/fn";

const mongo = {
    connect: {
        byEnv: (): Promise<Mongoose> => {
            return conn(`mongodb://${index.env.string("MG_HOST")}`, {
                user: index.env.string("MG_USERNAME"),
                pass: index.env.string("MG_PASSWORD"),
                dbName: index.env.string("MG_DATABASE"),
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

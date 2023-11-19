import { Db, MongoClient } from "mongodb";
import index from "@server/fn";

const connect = {
    connect: {
        byEnv: async (): Promise<Db> => {
            return connect.connect.byValue({
                host: index.env.string("MG_HOST"),
                username: index.env.string("MG_USERNAME"),
                password: index.env.string("MG_PASSWORD"),
                database: index.env.string("MG_DATABASE"),
            });
        },
        byValue: async (i: { host: string; username: string; password: string; database: string }): Promise<Db> => {
            const client = new MongoClient(`mongodb://${i.host})}`, {
                auth: {
                    username: i.username,
                    password: i.password,
                },
            });
            const conn = await client.connect();
            return conn.db(i.database);
        },
    },
};
export default connect;

import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import fn from "@server/fn";

abstract class MangoModel<DATA extends object> {
    private data?: DATA;

    protected constructor(
        protected colNm: string,
        protected mgList: FnMigrate[],
    ) {}

    public getMgList(): FnMigrate[] {
        return this.mgList;
    }

    public getColNm(): string {
        return this.colNm;
    }

    public async getData(): Promise<DATA> {
        if (this.data) {
            return this.data!;
        } else {
            throw new Error(`not loaded data: col_nm=${this.colNm}`);
        }
    }
}

interface MangoData {
    _id: ObjectId;
    colNm: String;
    nextId: Number;
    history: MangoDataHistory[];
    createdAt: Date;
    updatedAt: Date;
}

interface MangoDataHistory {
    memo: String;
    createdAt: Date;
}

const NullObjectId = ObjectId.createFromHexString("000000000000");

interface MangoSystem {
    _id: ObjectId;
    isTx: Boolean;
    createdAt: Date;
    updatedAt: Date;
}

class Mango {
    static colNm = "mango";

    static async startMigrate(col: Collection<MangoSystem>, ...forces: boolean[]): Promise<MangoSystem> {
        const filter = {
            _id: NullObjectId,
            isTx: fn.param.boolean(forces),
        };

        const count = await col.countDocuments(filter);
        const now = new Date();
        if (count === 0) {
            await col.insertOne({
                _id: NullObjectId,
                isTx: false,
                updatedAt: now,
                createdAt: now,
            });
        }

        const loaded = await col.findOneAndUpdate(filter, {
            $set: {
                isTx: true,
                updatedAt: now,
            },
        });

        if (!loaded) throw new Error("not found mango system");
        return loaded;
    }

    static async closeMigrate(col: Collection<MangoSystem>): Promise<MangoSystem> {
        const loaded = await col.findOneAndUpdate(
            {
                _id: NullObjectId,
                isTx: true,
            },
            {
                $set: {
                    isTx: false,
                    updatedAt: new Date(),
                },
            },
        );
        if (!loaded) throw new Error("not found mango system document");
        return loaded;
    }
}

type Memo = string;
type FnMigrate = (col: Collection) => Promise<Memo>;

const migrate = (db: Db, ...models: MangoModel[]): Promise<string> => {};

const mongo = {
    connect: {
        byEnv: async (): Promise<Db> => {
            return mongo.connect.byValue({
                host: fn.env.string("MG_HOST"),
                username: fn.env.string("MG_USERNAME"),
                password: fn.env.string("MG_PASSWORD"),
                database: fn.env.string("MG_DATABASE"),
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

            conn.db("ab").collection("");
            return conn.db(i.database);
        },
    },
};
export default mongo;

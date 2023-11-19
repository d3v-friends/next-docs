import { Collection, Db, ObjectId } from "mongodb";

const NullObjectID = ObjectId.createFromHexString("000000000000");

export interface Model {
    colNm: string;
    mgList: FnMigrate[];
}

export type Memo = string;
export type FnMigrate = (col: Collection) => Promise<Memo>;

interface DocSystem {
    _id: ObjectId;
    colNm: String;
    history: DocSystemHistory[];
    createdAt: Date;
    updatedAt: Date;
}

interface DocSystemHistory {
    memo: String;
    migAt: Date;
}
class Migrate {
    readonly docSystem: Model = {
        colNm: "systems",
        mgList: [
            async col => {
                return "init indexing";
            },
        ],
    };

    constructor(private db: Db) {}

    public async migrate(...models: Model[]) {
        try {
            await this.start();
        } finally {
            await this.end();
        }
        return;
    }

    private async start(): Promise<DocSystem> {
        const col = this.db.collection<DocSystem>(DocSystemModel.colNm);
        const system = await col.findOne({
            _id: NullObjectID,
            inTx: false,
        });

        const now = new Date();
        if (!system) {
            await col.insertOne({
                _id: new ObjectId(),
                colNm: DocSystemModel.colNm,
                history: [],
                createdAt: now,
                updatedAt: now,
            });
        }

        const doc = await col.findOne({
            _id: NullObjectID,
            inTx: false,
        });
    }

    private async createDocSystem(): Promise<DocSystem> {
        const res = await col.insertOne({
            _id: new ObjectId(),
            colNm: DocSystemModel.colNm,
            history: [],
            createdAt: now,
            updatedAt: now,
        });
    }

    private async end() {}

    private async migModel(model: Model) {}
}

const migrate = {
    run: async (conn: Db, ...models: Model[]): Promise<void> => {
        return;
    },
};
export default migrate;

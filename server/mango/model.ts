import { Promise } from "mongoose";
import { Collection, ObjectId } from "mongodb";

type Memo = string;
type FnMigrate<DATA extends object> = <DATA extends object>(col: Collection<DATA>) => Promise<Memo>;

abstract class Model<DATA extends object> {
    abstract mgList: FnMigrate<DATA>[];

    protected constructor(public readonly colNm: string) {}
}

interface SystemData {
    _id: ObjectId;
    colNm: String;
    history: {
        memo: String;
        migAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

class System extends Model<SystemData> {
    private mgList = [
        async col => {
            return "";
        },
    ];

    constructor() {
        super("systems");
    }
}

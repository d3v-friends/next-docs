import env from "./env";
import param from "./param";

export type Nullable<DATA extends object> = DATA | null | undefined;

const index = {
    env,
    param,
};

export default index;

import env from "./env";
import json from "./json";
import md from "./json";
import param from "./param";
import path from "./path";
import sign from "./sign";
import action from "./action";

const fnServer = {
    env,
    json,
    md,
    param,
    path,
    action,
    service: {
        sign,
    },
};

export default fnServer;

type ServerAction = <T extends object>(prev: any, form: FormData) => Promise<ActionResult<T>>;
type ActionStatus = 200 | 500;

type ActionResult<T> = {
    status: ActionStatus;
    responseAt: Date;
    message?: string;
    data?: T;
};

// example action
async function ProtoTypeAction(_: any, form: FormData): Promise<ActionResult<string>> {
    return wrapAction(form, async data => {
        // write your code...
        return "";
    });
}

type Handler<T> = (form: FormData) => Promise<T>;

async function wrapAction<T>(data: FormData, fn: Handler<T>): Promise<ActionResult<T>> {
    try {
        const res = await fn(data);
        switch (typeof res) {
            case "string":
                return {
                    status: 200,
                    responseAt: new Date(),
                    message: res,
                };
            case "function":
                res();
                return {
                    status: 200,
                    responseAt: new Date(),
                };
            case "object":
                return {
                    status: 200,
                    responseAt: new Date(),
                    data: res as any,
                };
            default:
                return {
                    status: 200,
                    responseAt: new Date(),
                };
        }
    } catch (e) {
        if (e instanceof Error) {
            return {
                status: 500,
                message: e.message,
                responseAt: new Date(),
            };
        }

        return {
            status: 500,
            message: JSON.stringify(e),
            responseAt: new Date(),
        };
    }
}

function initAction<T>(): ActionResult<T> {
    return {
        status: 200,
        responseAt: new Date(),
    };
}

const fnAct = {
    wrapAction,
    initAction,
};

export default fnAct;

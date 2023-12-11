// type ServerAction = <T extends object>(prev: any, form: FormData) => Promise<ActionResult<T>>;
import { redirect } from "next/navigation";

type ActionStatus = 200 | 500;

export type ActionResult<T> = {
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
                return redirect(res);
            case "object":
                if (!res) {
                    return {
                        status: 200,
                        responseAt: new Date(),
                    };
                }

                if (res.hasOwnProperty("message")) {
                    return {
                        status: 200,
                        message: (res as any)["message"],
                        responseAt: new Date(),
                    };
                }

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
        if (!(e instanceof Error)) {
            return {
                status: 500,
                message: JSON.stringify(e),
                responseAt: new Date(),
            };
        }

        switch (e.message) {
            case "NEXT_REDIRECT":
                const url = (e as any).digest.split(";")[2];
                redirect(url);
            default:
                return {
                    status: 500,
                    message: e.message,
                    responseAt: new Date(),
                };
        }
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

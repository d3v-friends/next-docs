type ErrMessage = string | null | undefined | void;
type FormAction = (prev: any, data: FormData) => Promise<ErrMessage>;
type FnFormAction = (data: FormData) => Promise<ErrMessage>;
type NextFormAction = (prev: any, data: FormData) => Promise<string>;

const formAction = (fn: FnFormAction): NextFormAction => {
    return async ({ data }): Promise<string> => {
        try {
            const errMsg = await fn(data);
            return errMsg || "";
        } catch (e) {
            return JSON.stringify(e);
        }
    };
};

const fnAction = {
    formAction,
};

export default fnAction;

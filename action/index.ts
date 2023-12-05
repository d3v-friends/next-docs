import { SignInAction, SignOutAction, SignUpAction } from "./sign";

const Action = {
    sign: {
        in: SignInAction,
        up: SignUpAction,
        out: SignOutAction,
    },
    initAction: {
        code: 200,
        resAt: new Date(),
    },
};

export default Action;

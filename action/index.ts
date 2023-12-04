import { SignInAction, SignOutAction, SignUpAction } from "./sign";

const Action = {
    sign: {
        in: SignInAction,
        up: SignUpAction,
        out: SignOutAction,
    },
};

export default Action;

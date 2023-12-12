import blockUtil from "@block/blockUtil";

interface Props {
    pending?: boolean;
}

export default function Comp({ pending }: Props) {
    return <>{pending && <div className={blockUtil.merge("backdrop")}>Loading</div>}</>;
}

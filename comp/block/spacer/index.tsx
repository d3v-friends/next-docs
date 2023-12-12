type Props = {
    height?: number | string
}
export default function Comp({ height }: Props) {

    return <div style={{ height: height || "2rem" }}></div>;
}

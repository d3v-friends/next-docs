type Props = {
    children: string;
};

export default function Comp({ children }: Props) {
    return <div className="mermaid">{children}</div>;
}

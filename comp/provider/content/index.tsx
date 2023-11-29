import { JSX } from "react";

export type ProviderContentProps = {
    content: string;
    subscriber?: string[];
    author?: string;
    createdAt?: string;
    updatedAt?: string;
};

type Props = {
    filepath: string;
    children: (i: ProviderContentProps) => JSX.Element;
};
const comp = ({ children, filepath }: Props) => {
    return children({
        content: "",
    });
};

export default comp;

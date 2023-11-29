import { useRouter } from "next/navigation";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";

type Props = {
	href: string;
	target?: HTMLAttributeAnchorTarget;
	children?: ReactNode;
};

export default function Comp({ children, href, target }: Props): ReactNode {
	const route = useRouter();
	return (
		<a onClick={() => route.push(href)} target={target || "_self"}>
			{children}
		</a>
	);
}

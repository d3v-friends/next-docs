"use client";

import css from "./index.module.scss";
import { ReactNode } from "react";

type Props = {
	value: string;
	children: ReactNode;
};

export default function ({ value, children }: Props) {
	const handler = {
		onClickCopy: () => {
			window.navigator.clipboard
				.writeText(value)
				.then(() => alert("copied"))
				.catch(() => alert("fail"));
		},
	};
	return <div onClick={handler.onClickCopy}>{children}</div>;
}

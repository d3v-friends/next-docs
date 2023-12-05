import { JSX } from "react";

type Props = {};

export default async function Page({}: Props): Promise<JSX.Element> {
    return (
        <div>
            <h1>page</h1>
        </div>
    );
}

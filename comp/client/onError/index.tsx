"use client";
import { useSearchParams } from "next/navigation";
import { ReactNode, JSX } from "react";
import OnModal from "@client/onModal";
import OnOff from "@client/onOff";
import css from "./index.module.scss";

interface Props {
    children?: ReactNode;
}

const KeyError = "error";

const Comp = ({ children }: Props): JSX.Element => {
    const searchParams = useSearchParams();
    const error = decodeURI(searchParams.get(KeyError) || "");

    return (
        <OnOff on={searchParams.has(KeyError)}>
            <OnModal header={"Error"}>{error}</OnModal>
        </OnOff>
    );
};

export default Comp;

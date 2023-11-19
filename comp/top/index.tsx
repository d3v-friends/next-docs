import { ReactNode } from "react";
import styles from "./index.module.scss";
import Link from "next/link";

const UContainer = (props: { children?: ReactNode }) => {
    return <div className={styles.container}>{props.children}</div>;
};

const UItem = ({ children, href }: { children: ReactNode; href: string }) => {
    return (
        <div className={styles.item}>
            <Link href={href}>{children}</Link>
        </div>
    );
};
const UTitle = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.title}>
            <Link href="/">{children}</Link>
        </div>
    );
};

const USpace = () => {
    return <div className={styles.space}></div>;
};

export const UTop = {
    Item: UItem,
    Space: USpace,
};

export default function Component({ children, title }: { children: ReactNode; title: ReactNode }) {
    return (
        <>
            <UContainer>
                <UTitle>{title}</UTitle>
                {children}
            </UContainer>
            <div className={styles.margin} />
        </>
    );
}
// import { ReactNode } from "react";
// import Link from "next/link";
// import UI from "@comp/index";
//
// const height = 40;
// const { styled, colors } = UI;
//
// const UContainer = styled("div", {
//     display: "flex",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: height,
// });
//
// const UTitle = styled("div", {
//     backgroundColor: colors.primary,
//     height: "100%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "0 10px 0 10px",
//     a: {
//         color: colors.background.gray,
//         fontWeight: 800,
//     },
// });
//
// const UMargin = styled("div", {
//     height,
// });
//
// const UItemCont = styled("div", {
//     display: "flex",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     margin: "0 0 0 10px",
//     color: colors.disabled,
//     fontWeight: 700,
// });
//
// export const UTopComp = {
//     Space: styled("div", {
//         flexGrow: 1,
//     }),
//     Item: (props: { children: ReactNode; href: string }) => (
//         <Link href={props.href}>
//             <UItemCont>{props.children}</UItemCont>
//         </Link>
//     ),
// };
//
// export default function Comp(props: { title: ReactNode; children: ReactNode }) {
//     const { title, children } = props;
//     return (
//         <>
//             <UContainer>
//                 <UTitle>
//                     <Link href="/">{title}</Link>
//                 </UTitle>
//                 {children}
//             </UContainer>
//             <UMargin />
//         </>
//     );
// }

import Tab from "@block/tab";

type Props = {
    activeName: string;
};

export default function Comp({ activeName }: Props) {
    return (
        <Tab title={<h3>Manage</h3>} activeName={activeName}>
            {[
                // {
                //     name: "git",
                //     href: "/manage/git",
                // },
                {
                    name: "index",
                    href: "/manage/idx",
                },
                // {
                //     name: "sync",
                //     href: "/manage/sync",
                // },
            ]}
        </Tab>
    );
}

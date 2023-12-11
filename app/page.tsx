import blocks from "@block/index";
import { Metadata } from "next";
import Link from "next/link";
import { JSX } from "react";
import svg from "@svg/index";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "home",
    };
};

const { Tooltip, Icon, Markdown } = blocks;

export default async function Comp(): Promise<JSX.Element> {
    return (
        <>
            <h1>hello</h1>
            <Link className="a" href="/">
                go home
            </Link>
            <div></div>
            <label htmlFor="username">username</label>
            <input id="username" type="text" name="username" />
            <hr />
            <button className="primary">go to home</button>
            <button className="primary outline">go to home</button>

            <br />
            <Tooltip tooltip={"bottom"} loc="bottom">
                bottom
            </Tooltip>

            <br />
            <Tooltip tooltip={"top"} loc="top">
                top
            </Tooltip>

            <br />
            <Tooltip tooltip={"left"} loc="left">
                left
            </Tooltip>

            <br />
            <Tooltip tooltip={"right"} loc="right">
                right
            </Tooltip>

            <br />
            <Icon src={svg.primary.link} isText hover tooltip="link">
                Icon
            </Icon>

            <Markdown>{md}</Markdown>
            {/*<Modal>modal</Modal>*/}
        </>
    );
}

const md = `
# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

## Tasklist

* [ ] to do
* [x] done


## code

~~~cpp
#include<iostream>

using namespace std;

int main() {
    sin << "hello world" << sout;
    return 0;
}
~~~

---

~~~mermaid
flowchart TB

a --> b
~~~
`;

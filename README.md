# next-docs

* simple documents manager with next.js and markdown

# style

* break point 는 유튜브를 기준으로 잘랐다.
* 기준은 가로 사이즈! 기준
* min-width 기준으로 키워 나간다.
  [해상도](https://support.google.com/youtube/answer/6375112?hl=ko&co=GENIE.Platform%3DDesktop)


| name | simple name | width(px) | type            | etc |
|------|-------------|-----------|-----------------|-----|
| bp1  | sbp1        | 360       | mobile          |     |
| bp2  | sbp1        | 720       | mobile (tablet) |     |
| bp3  | sbp2        | 1080      | pc              |     |
| bp4  | sbp2        | 1440      | pc (wide)       |     |

* 4320p(8k): 7680x4320.
  2160p(4K): 3840x2160.
  1440p(2k): 2560x1440.
  1080p(HD): 1920x1080.
  720p(HD): 1280x720.
  480p(SD): 854x480.
  360p(SD): 640x360.

## color

1. 모두 다음 상태값을 가지고 있다. 단 정해지지 않았다면, 모두 normal 컬러로 채워둔다.
    - normal
    - active
    - hover
    - disabled
    

# typescript

* call signatures [docs](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures)

# todo

* git 초기화 및 클론 기능

# samples

https://www.svgrepo.com/collection/dazzle-line-icons/
https://change-svg-color.vercel.app/
https://demo.bootstrapdash.com/corona/jquery/template/modern-vertical/index.html

# gh cli

* access token 권한 설정 필요
  repo, read:org, and gist.

- ref [https://cli.github.com/manual/gh_auth_login](https://cli.github.com/manual/gh_auth_login)

# debugger

* win
    - chrome://inspect
* mac

# markdown

* @@@ info
    1. share = string[], 지정하지 않으면 기본값은 admin 이된다.
       admin,maintainer,reader,all

* tag
  a, blockquote, br, code, em, h1, h2, h3, h4, h5, h6, hr, img, li, ol, p, pre, strong, and ul. With remark-gfm,
  you can
  also use del, input, table, tbody, td, th, thead, and tr

# 개발일지

* 23-11-29
    *
* 23-11-19
    - 전체 아키텍쳐 구상중
    - db 는 mongo db 사용. mongo-driver(official) 사용하기 vs Mongoose




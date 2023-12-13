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

# samples

https://www.svgrepo.com/collection/dazzle-line-icons/
https://change-svg-color.vercel.app/
https://demo.bootstrapdash.com/corona/jquery/template/modern-vertical/index.html

# markdown

# tag 예시

* @@@readable=admin,maintainer,subscriber,all
* @@@alias=name
* @@@tags=content,etc...
* @@@create=2023-12-12
* @@@update=2023-12-12

# 개발일지

* 23-12-13
  * 베타 시작
    
* 23-11-19
    - 전체 아키텍쳐 구상중
    - db 는 mongo db 사용. mongo-driver(official) 사용하기 vs Mongoose




# 호스트 머신에서 실행한다.

#!/bin/bash
set -e;

CONT_NM=$1;

docker exec -it "$CONT_NM" git pull;
docker exec -it "$CONT_NM" pnpm run build;
docker restart "$CONT_NM";

docker exec -it blog /bin/bash {
    cd /root/next-docs;
    git pull;
    pnpm run build
}
docker restart blog

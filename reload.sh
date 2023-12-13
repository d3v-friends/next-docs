git pull
fuser -k 3000/tcp
pnpm run build
pnpm run start

// reload.sh 종료
// ps -ef | grep reload.sh

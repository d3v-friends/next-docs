echo `
TZ=utc
ROOT_PATH=/root

# session
JWT_SECRET=dieni!@3i23jGAd
JWT_ISSUER=friends

# metadata
MT_TITLE=friends
` > $HOME/next-docs/.env.production

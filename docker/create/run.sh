#!/bin/sh

USERNAME=$1
TAG="$USERNAME/next-docs:1.0.0"
LATEST="$USERNAME/next-docs:latest"

docker build \
    -t "$TAG" \
    -t "$LATEST" \
    -f ./docker/create/dockerfile .

docker push "$TAG"
docker push "$LATEST"

#!/bin/sh
set -e

mkdir -p /root/vscode
cd /root/vscode
curl -Lk 'https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64' --output /root/vscode/vscode_cli.tar.gz
tar xvf vscode_cli.tar.gz
rm vscode_cli.tar.gz

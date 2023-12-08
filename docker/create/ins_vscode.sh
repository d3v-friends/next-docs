#!/bin/bash
set -e

mkdir -p $HOME/vscode
cd $HOME/vscode
curl -Lk 'https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64' --output $HOME/vscode/vscode_cli.tar.gz
tar xvf vscode_cli.tar.gz
rm vscode_cli.tar.gz

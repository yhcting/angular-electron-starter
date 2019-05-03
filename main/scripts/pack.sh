#!/bin/bash

set -eo pipefail

trap 'on_exit' EXIT

on_exit() {
    rm -rf renderer
    ln -s ../renderer/dist/renderer renderer
}

npm run build:prod
rm -f renderer
cp -r ../renderer/dist/renderer renderer
npx electron-builder build --linux

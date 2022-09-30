#!/bin/sh

echo "Transpile seeders..."

search_dir=$(pwd)/src/db/seeders

./node_modules/typescript/bin/tsc $search_dir/*.ts \
  --module commonjs \
  --moduleResolution node \
  --target es2021 \
  --outDir $(pwd)/build/db/seeders

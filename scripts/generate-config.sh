#!/bin/sh

echo "Transpile config..."

search_dir=$(pwd)/src/db/config

./node_modules/typescript/bin/tsc $search_dir/config.ts \
  --module commonjs \
  --moduleResolution node \
  --target es2021 \
  --outDir $(pwd)/build/db/config
\

#!/bin/sh

echo "Transpile migrations..."

search_dir=$(pwd)/src/db/migrations

./node_modules/typescript/bin/tsc $search_dir/*.ts \
  --module commonjs \
  --moduleResolution node \
  --target es2021 \
  --outDir $(pwd)/build/db/migrations

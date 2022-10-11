#!/bin/sh

src_dir=$(pwd)/src/db/migrations
dst_dir=$(pwd)/build/db

rm -rf $dst_dir/*

echo "Transpile migrations..."

./node_modules/typescript/bin/tsc $src_dir/*.ts \
  --module commonjs \
  --moduleResolution node \
  --target es2021 \
  --outDir $dst_dir
\

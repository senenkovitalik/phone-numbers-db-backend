#!/bin/sh

src_dir=$(pwd)/src/db/config
dst_dir=$(pwd)/build/db/config

rm $dst_dir/*

echo "Transpile config..."

./node_modules/typescript/bin/tsc $src_dir/config.ts \
  --module commonjs \
  --moduleResolution node \
  --target es2021 \
  --outDir $dst_dir
\

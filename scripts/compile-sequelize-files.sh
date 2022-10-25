#!/bin/sh

src_dir=$(pwd)/src/db
dst_dir=$(pwd)/build

rm -rf $dst_dir/*

echo "Transpile sequelize config, migrations and seeders"

./node_modules/typescript/bin/tsc \
  $src_dir/config/* \
  $src_dir/migrations/* \
  $src_dir/seeders/* \
  --module commonjs \
  --moduleResolution node \
  --target es2021 \
  --outDir $dst_dir
\

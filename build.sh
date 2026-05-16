#!/bin/bash
# 配信用ファイルのみdist/に集約する

mkdir -p dist/images

# メインHTMLファイル
cp index.html dist/
cp google4d9400198cde999a.html dist/ 2>/dev/null || true

# 画像・ロゴ
cp hero.webp dist/ 2>/dev/null || true
cp logo.png dist/ 2>/dev/null || true
cp トップ.png dist/ 2>/dev/null || true

# imagesフォルダ
cp -r images/ dist/

# Cloudflare設定ファイル
cp _headers dist/

echo "✅ dist/ built successfully"
ls dist/

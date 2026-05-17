#!/bin/bash
# 配信用ファイルのみdist/に集約する

mkdir -p dist/images

# メインHTMLファイル
cp index.html dist/
cp google4d9400198cde999a.html dist/ 2>/dev/null || true

# 画像・ロゴ
cp hero.webp dist/ 2>/dev/null || true
cp logo.png dist/ 2>/dev/null || true
cp logo.webp dist/ 2>/dev/null || true
cp トップ.png dist/ 2>/dev/null || true

# imagesフォルダ(メニュー商品の本番webp一式)
cp -r images/ dist/

# sakuraya-webp/ (TWO COL スライドショーで使う背景写真44枚)
cp -r sakuraya-webp/ dist/ 2>/dev/null || true

# メニュー/ の中で本番が参照するアセットだけ個別に運ぶ
# (源PNG群はデプロイ対象外 — リポサイズ節約のため)
mkdir -p "dist/メニュー"
cp "メニュー/Gemini_Generated_Image_nevqvmnevqvmnevq.png" "dist/メニュー/" 2>/dev/null || true

# Cloudflare設定ファイル
cp _headers dist/

echo "✅ dist/ built successfully"
ls dist/

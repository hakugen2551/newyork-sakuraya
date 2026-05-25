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

# メニュー/ 配下の源PNG群はデプロイ対象外(リポサイズ節約のため)
# 2026-05-25 集合写真(Gemini画像)はHPから削除されたため cp 不要に

# Cloudflare設定ファイル
cp _headers dist/

# SEO/AIO ルートファイル
cp sitemap.xml dist/ 2>/dev/null || true
cp robots.txt dist/ 2>/dev/null || true
cp llms.txt dist/ 2>/dev/null || true

echo "✅ dist/ built successfully"
ls dist/

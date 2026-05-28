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

# 店舗モニター用スライドショー(隠しパス /store-display/、noindex設定済)
# Fire TV Silk Browser等で newyork-sakuraya.com/store-display/ にアクセスして使う
# ローカル開発時のフォルダ名「New York桜屋since2001」を、本番では英語名「photos」にrename
# (CloudflareのLinuxビルド環境で日本語フォルダ名のcpが不安定なため)
mkdir -p dist/store-display
sed 's|"New York桜屋since2001/"|"photos/"|g' slideshow_sakuraya.html > dist/store-display/index.html
cp -r "New York桜屋since2001" dist/store-display/photos 2>/dev/null || true
echo "store-display contents:"
ls -la dist/store-display/ | head -5
ls dist/store-display/photos/ 2>/dev/null | wc -l | xargs -I{} echo "  photos/ has {} files"

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

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
mkdir -p dist/store-display
cp slideshow_sakuraya.html dist/store-display/index.html
cp -r store-photos/ dist/store-display/store-photos/
# Cloudflare Workers の 25MiB asset上限超のファイルを除外(動画/大容量画像対策)
# 主に MP4 や iPhone のフルサイズHEIC等を弾く
find dist/store-display/store-photos/ -type f -size +20M -delete 2>/dev/null || true
# 動画系はそもそも配信しない方針(スライドショーはjpgのみ使用)
rm -rf dist/store-display/store-photos/動画 2>/dev/null || true
find dist/store-display/store-photos/ -type f \( -iname "*.mp4" -o -iname "*.mov" -o -iname "*.avi" \) -delete 2>/dev/null || true
echo "store-display contents:"
ls -la dist/store-display/
echo "  photos count: $(ls dist/store-display/store-photos/ 2>/dev/null | wc -l)"
echo "  total size: $(du -sh dist/store-display/store-photos/ 2>/dev/null | cut -f1)"

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

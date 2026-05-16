# NEW YORK SAKURAYA(ニューヨーク桜屋) ホームページ更新プロジェクト

このリポジトリは https://newyork-sakuraya.com/ のソースコードです。
**Claude(AIアシスタント)が自動で更新するための指示書** として、このファイルは Claude が起動時に必ず読みます。

---

## 🏪 サイトについて

- **店名:** NEW YORK SAKURAYA / ニューヨーク桜屋
- **業態:** テイクアウト専門 洋菓子店(和洋スイーツ・パン)
- **所在地:** 福岡県春日市 伯玄町20-55-4
- **創業:** 2001年
- **電話:** 090-5923-9678
- **Email:** hakugen2551@gmail.com
- **Instagram:** [@newyorksakuraya](https://www.instagram.com/newyorksakuraya/)
- **コンセプト:** ニューヨークと福岡をつなぐ「桜屋」。和のこころで作るワールドスイーツ

---

## 👥 編集者

| GitHub アカウント | 名前 | 役割 |
|---|---|---|
| `kuliaxwz` | 白源(主担当・全技術作業) | コード更新、デザイン変更、デプロイ設定、新機能、トラブル対応、コンテンツ実装 |
| `hakugen2551` | お店オーナー本人 | コンテンツ提供(新メニュー情報・写真素材・お知らせ文)、内容確認・承認 |

**実質的な編集はすべて kuliaxwz が担当**。お店オーナーはご依頼者であり、技術操作は基本しない。
過去コミットで `hakugen2551` 名義のものは、`kuliaxwz` が一時的にお店オーナーのGitHubアカウントを使って作業していた時代のもの(現在は kuliaxwz 自身のアカウントで運用)。

**プログラミング前提知識はあまり高くないので、専門用語は避け、日本語で丁寧に確認しながら進めること。**
曖昧な指示の時は決め打ちせず「**○○ということでよろしいですか?**」と確認してから着手。

---

## 💸 ホスティング移行の背景

**Netlify の無料枠(帯域 100GB/月 or ビルド 300分/月)を超過** したため、デプロイが有料アップグレード必須となり、kuliaxwz が **Cloudflare Pages への完全移行** を進めている(2026-05時点)。Cloudflare Pages は無料枠が帯域無制限・月500ビルドと大幅に余裕があるため。

移行は **コード側はほぼ完了、DNS切替待ち** の段階。

---

## 🏗️ システム構成図

```
┌────────────────────────────────────────────────────────────────────────┐
│                          編集する人                                      │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│    [ お店オーナー(店主) ]              [ 主担当 kuliaxwz PC ]            │
│       hakugen2551                          ↓ 全技術作業を実施           │
│           │                                ↓                           │
│           │ メール/LINE等で                Claude Code 起動             │
│           │ 「新メニュー出した」           → 自動で git pull             │
│           │ 「写真送ります」               → 編集・コミット              │
│           │ 「営業時間変えて」             → push                       │
│           ▼                                ↓                           │
│       (素材・要望)─────────────────────▶  作業実施                       │
│                                            ↓                           │
│                                       git push                         │
└────────────────────────────────────────────────────────────────────────┘
                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       コードの保管庫                                     │
├────────────────────────────────────────────────────────────────────────┤
│   GitHub: hakugen2551/newyork-sakuraya  (main branch)                  │
│   ・全ファイル + 全変更履歴を保存                                         │
│   ・両編集者の作業を自動マージ                                            │
└────────────────────────────────────────────────────────────────────────┘
                         │
                         │ Webhook (pushがあったら自動通知)
                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       自動デプロイ                                       │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  【現在の本番】Netlify (Server: Netlify)                                │
│       ・main ブランチを直接デプロイ                                       │
│       ・netlify.toml で設定(セキュリティヘッダ、キャッシュ等)             │
│                                                                        │
│  【移行準備中】Cloudflare Pages                                          │
│       ・wrangler.jsonc, _headers, _redirects, build.sh で設定           │
│       ・build.sh で dist/ にファイルを集約してから配信                    │
│       ・**DNS切り替えはまだ未実施**(現在もNetlify配信)                    │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│              https://newyork-sakuraya.com/                              │
│                   ↑                                                    │
│                   訪問者(一般のお客さん)                                 │
└────────────────────────────────────────────────────────────────────────┘
```

### ⚠️ Cloudflare移行に関する注意

このプロジェクトは **Netlify → Cloudflare Pages への移行作業中** です。
両方の設定ファイルが共存している状態:

| ファイル | 用途 | 触ってよいか |
|---|---|---|
| `netlify.toml` | Netlify 設定(現在の本番) | **触らない** |
| `wrangler.jsonc` | Cloudflare Pages 設定 | **触らない**(移行担当者の領域) |
| `_headers` | Cloudflare用 HTTPヘッダー設定 | **触らない** |
| `_redirects` | Cloudflare用 リダイレクト設定 | **触らない** |
| `build.sh` | Cloudflareビルド時のファイル集約 | **触らない** |
| `.wranglerignore` | Cloudflareデプロイ時の除外 | **触らない** |

**DNSの NS は現在 `nsone.net`(Netlify Managed DNS)** で、IPは AWS Singapore(Netlifyのエッジ)を指している。 つまり実配信はまだ Netlify。

---

## 📁 ファイル構成

### ページ(HTML)

| ファイル | 役割 |
|---|---|
| `index.html` | メインページ(トップ・メニュー・アクセス全部) |
| `slideshow_sakuraya.html` | スライドショーページ(別ページ) |
| `google4d9400198cde999a.html` | Google Search Console 所有権確認(削除厳禁) |

### index.html のセクション構成

```
<section id="top">    ─ ヒーロー(ファーストビュー、hero.webp)
<section id="about">  ─ WHAT IS SAKURAYA(店紹介)
<section id="menu">   ─ MENU(全メニュー一覧)
  - CREAM PUFF       (シュークリーム)
  - MINI PIE         (ミニパイ)
  - DECO             (デコレーション)
  - KAMJA            (カムジャパン)
  - PUDDING          (プリン)
  - BUTTER           (バター系)
  - FRESH            (生菓子)
  - MATCHA           (抹茶)
  - HOJICHA          (ほうじ茶)
  - ITOSHIMA × 2     (糸島系商品)
  - RICH ORANGE      (オレンジ系)
  - ICED / HOT       (ドリンク)
<section id="instagram">─ Instagram 埋め込み
<section id="access"> ─ アクセス・地図
```

### アセット(画像・ロゴ)

- `images/` — メニュー写真等(全て `.webp` 形式推奨)
- `sakuraya-webp/` — 過去にWebP変換済みの写真群(参考素材)
- `New York桜屋since2001/` — 元画像素材(変換前のJPG/PNG)
- `hero.webp` — トップのファーストビュー画像
- `logo.png`, `logo.webp` — ロゴ
- `トップ.png` — 大判のヒーロー素材
- `shop_main.jpg` — お店外観(未使用、保管中)

### スクリプト・設定

- `package.json` — Node.js依存(`sharp`, `canvas`, `@ffmpeg-installer/ffmpeg`, `dotenv`)
- `convert-images.js` — 画像WebP変換スクリプト(Sharp使用)
- `generate-images.js` — 画像生成用(canvas使用)
- `update-html.js` — HTML自動更新
- `sitemap.xml` — SEO用サイトマップ
- `netlify.toml` — Netlify 設定(現本番)
- `wrangler.jsonc`, `_headers`, `_redirects`, `build.sh` — Cloudflare Pages 移行用
- `.gitignore` — Git除外設定
- `CLAUDE.md` — このファイル

### Git除外(コミットしない)

`node_modules/`, `.env`, `.claude/settings.local.json`, `reel_output/`, `scripts/`, `*.mp4`, `*.mov`, `shop_main.jpg`, `*.ai`, `*.pdf`, `*.doc*`

---

## 🎨 デザイン規約

### カラー

- **メインカラー**: `#1A3A6E`(濃いネイビーブルー、ブランドカラー)
- **背景**: `#fff`(白)

### フォント(Google Fonts)

| 用途 | フォント | 重み |
|---|---|---|
| 英文タイトル(店名等) | Playfair Display | italic 400, 600 |
| 英文見出し | Barlow | 400, 600, 700, 800 |
| アクセント・装飾 | Dancing Script | 600, 700 |
| 日本語本文 | Noto Sans JP | 300, 400, 500 |

CSS のグローバル設定: `body { font-family: 'Noto Sans JP', sans-serif; color: #1A3A6E; }`

### トーン

- 上品で温かみがある(老舗洋菓子店、創業2001年)
- ニューヨーク + 福岡 のハイブリッド感
- 「和のこころで作るワールドスイーツ」がキャッチフレーズ

---

## 🔍 SEO・SNS連携

- **構造化データ:** Schema.org `Bakery` (`<script type="application/ld+json">` 内)
- **OGP/Twitter Card:** 設定済(`hero.webp` を OG画像として使用)
- **Google Analytics 4:** `G-1MZ939FF69` 設定済
- **Google Search Console:** 所有権確認済(`google4d9400198cde999a.html`)
- **canonical URL:** `https://newyork-sakuraya.com/`

メニュー追加や情報変更の際は、対応する **構造化データ** と **メタディスクリプション** の更新も検討すること。

---

## 🔄 セッション開始時(自動化済み)

`.claude/settings.json` の SessionStart フックで **自動的に `git pull --rebase --autostash`** が実行されます。
ユーザーが何も言わなくても、起動時に最新の GitHub の内容と同期されます。

起動時に `🔄 GitHub から最新版を取得中...` → `✅ 最新の状態で作業を開始できます` が出れば正常。

---

## ✏️ 編集時のルール

### 着手前

- ユーザーの依頼を **言い換え + 確認** してから着手
- 複数解釈ある場合は選択肢提示
- 編集するファイルと変更内容を **箇条書きで提示**

### 編集中

- HTML構造を壊さない、既存クラス名/idは可能な限り維持
- ブランドカラー `#1A3A6E` を保つ
- 日本語フォントは `Noto Sans JP`、英文は `Barlow` / `Playfair Display`
- 画像追加時は **WebP化を必須**(`convert-images.js` 参考)
- メニュー追加時は **構造化データ(JSON-LD)** も併せて更新を検討

### 編集後

ユーザーから「コミットして」「pushして」「公開して」等と言われたら:

1. `git status` と `git diff` で変更を確認・提示
2. 適切なコミットメッセージで `git add` → `git commit`
3. `git push origin main`
4. Netlify が約30秒〜2分で自動デプロイ
5. 「**ブラウザのキャッシュを更新(Ctrl+F5)で確認できます**」と案内

ユーザーが明示的に「コミットして」と言わない限り、勝手にコミットしない。

---

## 📝 コミットメッセージ規約

日本語+プレフィックスで簡潔に(過去コミットに合わせる):

| プレフィックス | 用途 | 例 |
|---|---|---|
| `feat:` | 新機能・新規追加 | `feat: 季節限定メニューを追加` |
| `fix:` | 修正・不具合対応 | `fix: メニュー写真の差し替え` |
| `chore:` | 設定・整理 | `chore: .gitignore を整理` |
| `seo:` | SEO関連 | `seo: メタディスクリプション更新` |
| `perf:` | パフォーマンス改善 | `perf: 画像をWebP化してサイズ削減` |
| `style:` | 見た目変更 | `style: ヘッダーの余白を調整` |
| `content:` | 文章変更 | `content: 店主からのご挨拶を更新` |
| `ci:` | デプロイ設定 | `ci: Cloudflare Pages設定追加` |

---

## ⚠️ してはいけないこと

- ❌ `netlify.toml`, `wrangler.jsonc`, `_headers`, `_redirects`, `build.sh` を勝手に編集しない(デプロイ設定。担当者領域)
- ❌ `google4d9400198cde999a.html` を削除しない(Google Search Console確認用)
- ❌ `.gitignore` の既存ルールを削除しない
- ❌ `node_modules/`, `.env`, `.claude/settings.local.json` をコミットしない
- ❌ **50MB以上のファイルをコミットしない**(GitHub上限)
- ❌ Instagram埋め込みのIDを変更しない(`newyorksakuraya`)
- ❌ GA4 トラッキングID(`G-1MZ939FF69`)を変更しない
- ❌ 構造化データの `@type: "Bakery"` や住所・電話番号を独断で変えない

---

## 🛠️ よく使うコマンド

```bash
# 画像のWebP変換(New York桜屋since2001/ の中の画像をsakuraya-webp/に変換)
node convert-images.js

# Cloudflare 用ビルド(dist/に配信ファイル集約)
bash build.sh

# 動作確認(ローカルプレビュー)
# index.html をブラウザで開くだけ(静的サイトなのでサーバー不要)
```

---

## 🆘 困った時

- エラー本文 + 推測原因 + ユーザーが取れる選択肢 を日本語で説明
- 解決できない場合は「**担当者(白源)にスクリーンショットを送ってご相談ください**」と案内

担当者連絡先: 白源(kuliaxwz) / [連絡先は別途共有]

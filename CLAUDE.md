# ニューヨーク桜屋 HP プロジェクト指示書

このリポジトリは https://newyork-sakuraya.com/ のソースコードです。
**Netlify** が GitHub の `main` ブランチと連携しており、`git push` するだけで自動デプロイされます。

## システム構成

```
あなたのPC (Claude Code)
    │
    │ git push
    ▼
GitHub  hakugen2551/newyork-sakuraya
    │
    │ Webhook で通知
    ▼
Netlify  自動ビルド & 公開
    │
    ▼
https://newyork-sakuraya.com/   ← 訪問者が見るサイト
```

## ファイル構成

- `index.html` ─ メインページ
- `slideshow_sakuraya.html` ─ スライドショーページ
- `images/` ─ サイト用画像(WebP優先)
- `sakuraya-webp/` ─ WebP変換済み画像置き場
- `メニュー/` ─ メニュー関連ページ
- `New York桜屋since2001/` ─ 元写真素材
- `netlify.toml` ─ Netlify ビルド/ヘッダ設定(触らないこと)
- `convert-images.js`, `generate-images.js`, `update-html.js` ─ 画像処理ユーティリティ(必要時のみ実行)

## 作業ルール

### セッション開始時(自動化済み)

- `.claude/settings.json` の SessionStart フックで **自動的に `git pull --rebase --autostash`** が走ります
- ユーザーが何も言わなくても、起動時に最新の GitHub の内容と同期されます
- 起動時に `🔄 GitHub から最新版を取得中...` が表示されたら成功

### 編集後の流れ

ユーザーから「コミットして」「pushして」「公開して」等と言われたら:

1. 変更内容を `git status` と `git diff` で確認
2. 適切なコミットメッセージで `git add` → `git commit`
3. `git push origin main`
4. Netlify が約30秒〜2分で自動デプロイ

### コミットメッセージのスタイル

過去のコミットに合わせて、日本語+プレフィックスで書く:

- `feat:` 新機能・新規追加(例: `feat: メニューに季節限定パスタを追加`)
- `fix:` バグ修正・不具合対応(例: `fix: スマホで画像がはみ出る問題を修正`)
- `chore:` 雑務・設定変更(例: `chore: .gitignore を整理`)
- `seo:` SEO関連(例: `seo: メタディスクリプションを更新`)
- `perf:` パフォーマンス改善(例: `perf: 画像を WebP に変換してサイズ削減`)
- `style:` 見た目変更(例: `style: ヘッダーの色を調整`)

### 画像追加時

- できる限り **WebP 形式** に変換する(`sharp` ライブラリで圧縮)
- 元画像が JPEG/PNG で大きい場合は、`convert-images.js` を参考に変換
- ファイル名は半角英数とハイフン推奨(日本語ファイル名はトラブルの元)

### 注意事項

- **大きな動画ファイル(50MB超)はコミットしない**。GitHub の制限に引っかかる。動画はYouTube/Vimeo等の埋め込みで対応
- `.env`、`.claude/settings.local.json`、`reel_output/`、`scripts/` などは `.gitignore` 済みで、コミット対象外
- `node_modules/` も `.gitignore` 済み。`npm install` でいつでも再生成可能
- 衝突(コンフリクト)が出た場合は内容を見て、どちらを採用するかユーザーに確認

### 検証

- 大きな変更後は、ローカルで `index.html` をブラウザで開いて見た目を確認することを推奨
- push 後、Netlify の自動デプロイが完了してから、本番サイトでも確認

## 編集者

- `kuliaxwz`(白源、開発者)
- `hakugen2551`(お客さん本人。レイアウト変更や画像追加など)

## ホスティング情報(参考)

- ドメイン登録: お名前ドットコム
- DNS: NS1 (nsone.net)
- ホスティング: Netlify(GitHub Actions 不使用、Netlify 標準ビルド)
- リポジトリ: https://github.com/hakugen2551/newyork-sakuraya

# ToneSynth

IonicとTone.js(Web Audio APIを扱うライブラリ)で作った PWA シンセサイザーです。  
4x4のパッドに触れると音を出力。  
スライダーでエフェクトをかけられます。

## PWA

https://ionic-tone.netlify.app/

## 技術スタック

- Angular 19 / Ionic 8
- Tone.js 15

## 開発

Node.js 20 推奨（`.nvmrc` 参照）。

```bash
npm install
npm start
```

ブラウザで http://localhost:4200/ を開き、パッドをタップして音を開始してください。

### 本番ビルド

```bash
npm run build -- --configuration production
```

出力は `www/` ディレクトリに生成されます。

### Netlify デプロイ

- ビルドコマンド: `npm run build -- --configuration production`
- 公開ディレクトリ: `www`
- SPA fallback: `netlify.toml` または `src/_redirects` で設定済み

## 既知の制限

- モバイルブラウザでは、最初のタップで AudioContext が起動します
- 推奨ブラウザ: Chrome, Safari, Firefox（最新版）

## プライバシーポリシー

本アプリではお客様の個人情報をお預かりすることはございません。  
お問い合せは下記までご連絡ください。  
masayukinii1011@gmail.com

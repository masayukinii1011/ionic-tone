# ToneSynth

IonicとTone.js(Web Audio APIを扱うライブラリ)でシンセサイザーを作成しました。  
Androidアプリ、デスクトップアプリ(Electron)、PWAとして使用できます。  
4x4のパッドに触れると音を出力。  
スライダーでエフェクトをかけられます。

## PWA

https://ionic-tone.netlify.app/

## Google Play

https://play.google.com/store/apps/details?id=nii_tone_synth_io.ionic.starter

## Desktop App (Electron)

### Windows

https://drive.google.com/file/d/171XiP-DMXLLhFa8WNXL7Ypxu3T7HaU8u/view

### Mac

https://drive.google.com/file/d/1Djnuihvq3WjYpak__liStpnyHwN5ZEa5/view

## 開発

Node.js 16 推奨（`.nvmrc` 参照）。Node 17 以降では OpenSSL 互換のため `npm` スクリプト内で `NODE_OPTIONS=--openssl-legacy-provider` を設定済みです。

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

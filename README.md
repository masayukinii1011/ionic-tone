# ToneSynth

IonicとTone.js(Web Audio APIを扱うライブラリ)で作った PWA シンセサイザーです。  
4x4のパッドに触れると音を出力。  
スライダーでエフェクトをかけられます。

## PWA

https://ionic-tone.netlify.app/

## 使い方

- **パッド:** 16音（C4〜D6）をタップ／クリックして演奏
- **同時発音数:** 最大 **6 音**

### エフェクトスライダー

| 名前 | 範囲 | 説明 |
|--------|------|------|
| **Filter** | 40〜400 | オートワウフィルターの基準周波数。低いほどこもった音、高いほど明るい音 |
| **Vibrato** | 0〜10 | ビブラート（音程の揺れ）の速さ |
| **Chorus** | 0〜1 | コーラス（厚み・うねり）の強さ |
| **DelayTime** | 0〜1 | ディレイ（エコー）の遅延時間（秒） |
| **DelayFeedback** | 0〜1 | ディレイのフィードバック量。高いほどエコーが長く残る |
| **ReverbRoomSize** | 0〜0.9 | リバーブの部屋の大きさ。高いほど広い空間感 |
| **ReverbWet** | 0〜100 | リバーブの混合量（%）。高いほど残響が強くなる |

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

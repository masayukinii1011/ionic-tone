# ToneSynth

ブラウザで動く 4×4 パッドシンセサイザー（PWA）。

[Ionic](https://ionicframework.com/) + [Tone.js](https://tonejs.github.io/) で作っています。  
パッドをタップして音を鳴らし、スライダーでエフェクトを調整できます。

**▶ デモ:** https://ionic-tone.netlify.app/

---

## できること

- 4×4（16音）のタッチ／クリックパッド
- 7 本のエフェクトスライダー（Filter / Vibrato / Chorus / Delay / Reverb）
- スマホ・PC ブラウザ対応（PWA としてホーム画面に追加可能）
- オフライン再生（Service Worker）

---

## 使い方

1. 上のデモ URL を開く
2. パッドをタップして音を開始（初回は AudioContext の起動が必要）
3. 下部スライダーでエフェクトを調整

### パッド

| | | | |
|:---:|:---:|:---:|:---:|
| C4 | D4 | E4 | F4 |
| G4 | A4 | B4 | C5 |
| D5 | E5 | F5 | G5 |
| A5 | B5 | C6 | D6 |

### シンセ仕様

| 項目 | 値 |
|------|-----|
| オシレーター | 三角波（triangle） |
| 同時発音数 | **6 音**（7 音目以降は最も古い音が止まる） |
| エンベロープ | attack 0.04s / decay 1s / sustain 1 / release 4s |

### シグナルチェーン

```
PolySynth → Filter → Vibrato → Chorus → Delay → Reverb → 出力
```

### エフェクトスライダー

| 名前 | 範囲 | 説明 |
|------|------|------|
| **Filter** | 40〜400 | オートワウフィルターの基準周波数。低いほどこもった音、高いほど明るい音 |
| **Vibrato** | 0〜10 | ビブラート（音程の揺れ）の速さ |
| **Chorus** | 0〜1 | コーラス（厚み・うねり）の強さ |
| **DelayTime** | 0〜1 | ディレイ（エコー）の遅延時間（秒） |
| **DelayFeedback** | 0〜1 | ディレイのフィードバック量。高いほどエコーが長く残る |
| **ReverbRoomSize** | 0〜0.9 | リバーブの部屋の大きさ。高いほど広い空間感 |
| **ReverbWet** | 0〜100 | リバーブの混合量（%）。高いほど残響が強くなる |

---

## 技術スタック

| カテゴリ | バージョン |
|----------|------------|
| Angular | 19 |
| Ionic | 8 |
| Tone.js | 15 |
| 配信 | Netlify（PWA） |

---

## 開発

**要件:** Node.js 20（[`.nvmrc`](.nvmrc) 参照）

```bash
npm install
npm start          # http://localhost:4200/
npm test           # ユニットテスト
npm run build -- --configuration production
```

ビルド成果物は `www/` に出力されます。

### Netlify デプロイ

| 設定 | 値 |
|------|-----|
| ビルドコマンド | `npm run build -- --configuration production` |
| 公開ディレクトリ | `www` |
| Node バージョン | 20（`netlify.toml`） |
| SPA fallback | `netlify.toml` / `src/_redirects` |

---

## 既知の制限

- モバイルブラウザでは最初のタップで AudioContext が起動します
- 推奨ブラウザ: Chrome / Safari / Firefox（最新版）

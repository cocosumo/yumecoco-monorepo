# 郵便番号データ

## 更新の手順

※１０分かかりますが、その間郵便番号データに依存しているシステムは使えません。

1. 最新データをダウンロード

   [全国一括](https://www.post.japanpost.jp/zipcode/dl/kogaki/zip/ken_all.zip)

   ※　より最近の新規データと廃止データが含まれないかもしれません。
   [毎月あるようです](https://www.post.japanpost.jp/zipcode/dl/kogaki-zip.html)


2. 以下のディレクトリにCSVを保存する

```
auto-common/src/assets/
```

3. [Kintone上データ](https://rdmuhwtt6gx7.cybozu.com/k/219/)を一括削除する。

4. 終わったら、yumecoco-monorepoで以下のコマンドを実行

```
nx upload:postal auto-common
```
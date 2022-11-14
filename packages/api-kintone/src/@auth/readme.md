# 認証

複数アプリトークンを管理するのは大変なので、oAuthに移行しました。
oAuth2を参考にTSで自動化しました。

## API実行のために必要な手順は次の通りです。

1から3は1回で、4と5が主な処理になります。

### 1. 認可要求

```bash
    nx authlink api-kintone
```

### 2. ユーザーによる認可

- コンソールにリンクが表示されるので、クリック
- コード取得 (10分有効)

### 3. 認可コードの取得

- URLのParamからコードを取得
- .env.KT_AUTH_CODE に保存

### 4. アクセストークンの要求・取得

- 以下コマンドを実行する

```bash
    nx get:refreshtoken api-kintone
```

access_tokenとrefresh_tokenを取得し、取得日時とともにディスクに格納される。

### 5. APIの実行

- access_tokenを認証コードとして利用し、APIを実行する。

## 参考

- oAuth2
[OAuthクライアントの使用](https://developer.cybozu.io/hc/ja/articles/360015955171-OAuth%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%81%AE%E4%BD%BF%E7%94%A8)

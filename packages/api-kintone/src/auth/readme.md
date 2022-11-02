# 認証

複数アプリトークンを管理するのは大変なので、oAuthに移行しました。
oAuth2を参考にTSで自動化しました。

## API実行のために必要な手順は次の通りです。

1から3は1回で、4と5が主な処理になります。

### 1. 認可要求
- generateAuthLink();

### 2. ユーザーによる認可
- コンソールにリンクが表示されるので、クリック
- コード取得 (10分有効)


### 3. 認可コードの取得
- URLのParamからコードを取得
- .env.KT_AUTH_CODE に保存


### 4. アクセストークンの要求・取得
- getAccessToken() を実行し、access_tokenとrefresh_tokenを取得
- access_token (1時間有効)、メモリに格納
- refresh_tokenは取得日時とdiskに格納
- 有効期限が切れる前に、refresh_tokenでaccess_tokenを自動再取得

### 5. APIの実行

- access_tokenで通常通りAPIを実行出来ます。


## 参考
- oAuth2
https://developer.cybozu.io/hc/ja/articles/360015955171-OAuth%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%81%AE%E4%BD%BF%E7%94%A8
# kokoas docusign authentication

kokoasのdocusignサーバのための認証仕組みです。

## その他と認証仕組み

サーバで開発のために、JWT認証を利用しています。
 [詳しくは](https://developers.docusign.com/platform/auth/jwt/jwt-get-token/).

## Onboarding

開発者のため。

1. Docusignの開発者アカウントを作成する。
2. Docusign管理者に招待を貰う。
3. 以下のAかBをする：
A.  [普段の手順](https://developers.docusign.com/platform/auth/jwt/jwt-get-token/)。
B. 新しいプロジェクトを[作成する](https://developers.docusign.com/docs/esign-rest-api/quickstart/)。
    - アプリ名を指定
    - NodeJsを選択する
    - JWTを選択する
    - プロジェクトをダウンロードして、解凍する。
    - jwConfig.jsonからdsJWTClientIdをコピーする。の
    - .env.DS_INTEGRATOR_KEYの値に張り付ける。
    - private.keyをコピーして api/config/keysに移動する。
    - docusign/authentication/getConsentUrlを実行　(jest)
    - リンクに行って、許可ボタンを押したら、エラーページになる。（仕様です。URLにコードあればOKです。）
    - 以下の単体テストを行い、エラーが無かったら、APIを呼ぶテストにすすめばOKです。
      - docusign/authentication/fetchAccessToken
      - docusign/authentication/fetchUserInfo

4. gitにpdfなどテンプレートを同期していないので、現状手動でコピーが必要です。（体制考え中）
5. api/docusign/getEnvelopeをテストし、OKだったら、開発に進めます。:rocket:

## 備考

- モノレポに移行中で、ファイル構成が大きく変わる見込みです。
- 日本語訂正や更新大歓迎です。

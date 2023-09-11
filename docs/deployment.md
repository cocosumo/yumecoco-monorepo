# 更新方法

## クライアントページ

1. 緊急修正は、masterからブランチを派生し、「hotfix」をつけて対応する
2. masterブランチにPRをMergeする
3. 現在のpackage.jsonのverの頭に'v'を付けた名前で、バックアップブランチを作る
4. masterブランチでfetchする
5. kokoas-clientのpackage.jsonのver.upする
6. ターミナルで、「npm i」を実行
7. 「nx build kokoas-client」を実行→ビルドされたら、ctrl+cで中断する
8. Git Hubで、package.jsonとpackage-lock.jsonのみにdiffがあることを確認
9. 内容に「bump」と記入し、コミットする　→　権限がある場合のみ。ただし、今後自動化予定
10. ステージングに更新を反映する 「nx upload:staging kokoas-client」
    → すぐにとまるので、何も表示されないが、kintoneのユーザ名とパスワードを入力する
11. テストして動作に問題なければ本番環境へ実装する「nx upload:prod kokoas-client」
12. 動作確認して、問題なければ終了

## サーバ

PuTTYで更新する。PuTTYの設定は、ここでは省略する

1. PuTTYでココアス用の設定(※1)を選択し、[load]をクリックしてから[open]する
2. IDとパスワードを入れる
3. ディレクトリに移動する[cd cocosumo.net/publichtml/nodejs/yumecoco-monorepo]
4. git fetch
5. git pull
6. ※エラーになった場合のみ git reset --hard
7. git pull
8. git pull
9. npm i
10. forever list
11. forever logs
12. forever stop 1
13. nx killport kokoas-server
14. nx forever kokoas-server
15. forever logs
16. forever logs 1 -f
17. サーバに関わる操作をし、ログにエラー(無限ループ)がなければOK
18. [ctrl]+cで終了

## xserverのエラー等でローカルサーバにて代用する場合の対処方法

1. PCでPowerShellを立ち上げる
2. ngrok http 3000 を実行する
3. Forwardingの左辺に記載されているエンドポイントをコピーする
4. .envファイルのBASE_URLに、上記3を設定する
5. kokoas-clientをアップロードする(上記、クライアントページの更新方法を参照)

## Putty設定(上記 ※1)

### 事前準備

自PCにPrivatekeyのppkファイルを保存しておく
ファイルはGoogle Driveの共有アイテム(※2)を参照のこと

### Private Key

1. Categoryにて、Connection -> SSH -> Auth に移動する
2. Authentication Parameters内のPrivate key file for authentication の[Brows...]をクリックする
3. 事前に準備したppkファイルを選択する

### Session(Top画面)

1. Host Name(or IP Address) : ホスト名を設定(※2より)
2. Port : ポート番号を設定(※2より)
3. Connection Type : SSH
4. Saved Session : 適当な名前を設定し、[Save]ボタンをクリックする

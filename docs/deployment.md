# 更新方法

**クライアントページ**

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


**サーバ**

PuTTYで更新する。PuTTYの設定は、ここでは省略する
1. PuTTYでココアス用の設定を選択し、[load]をクリックしてから[open]する
2. IDとパスワードを入れる
3. ディレクトリに移動する
```
cd cocosumo.net/publichtml/nodejs/yumecoco-monorepo
```
7. git fetch
8. git pull
9. ※エラーになった場合のみ git reset --hard
10. git pull
11. git pull
12. npm i
13. forever list
14. forever logs
15. forever stop 1
16. nx killport kokoas-server
17. nx forever kokoas-server
18. forever logs
19. forever logs 1 -f
20. サーバに関わる操作をし、ログにエラー(無限ループ)がなければOK
21. [ctrl]+cで終了

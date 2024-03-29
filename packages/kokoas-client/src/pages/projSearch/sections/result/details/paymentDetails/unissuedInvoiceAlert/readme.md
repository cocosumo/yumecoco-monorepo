# unissued invoice alert

## 請求書未発行アラート機能について

- アラート発行ボタンを押下時に、アラートの登録と通知がされる
- 発行したアラートはkintoneアプリにて管理
- アラートは営業担当者と経理担当者のチャットワークに送信される

## チャット送信対象について

- 通知対象の工事の営業担当者と経理担当者が対象
- 対象の工事に複数の担当者がいる場合、全員に送付される

### 経理担当者の通知条件について

- 対象の工事の担当エリア(東・西)によって送付先が異なる

#### 東エリアの場合

- 東・西両方の経理担当者へアラートが通知される

#### 西エリアの場合

- 西エリアの経理担当者にのみアラートが通知される

## 営業担当者の通知情報取得に失敗した場合

### 一人で担当している場合

- 通知内容をそのままグループチャットへ送信する

### 複数人で対応している場合

- 誰か一人に送信できていれば、グループチャットへは送信しない
- 全員の設定の取得に失敗した場合は、グループチャットへ送信する

## 送信エラーになった場合

- 文頭に【送信エラー】のついたメッセージがグループチャットへ送信される
- この場合文頭のエラーメッセージで誰宛のメッセージか確認できる
- 1通ずつの送信に対してエラー判定がなされるため、同じ通知内容で複数個グループチャットへ通知がいく可能性がある(この場合、文頭のエラーメッセージだけは異なる)

## 参考

### kintoneに保存されたアラート情報について

- auto-unissuedInvoiceReminderにて、アラートのリマインダー機能として活用される

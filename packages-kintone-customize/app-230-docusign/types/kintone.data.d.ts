declare namespace DB {
  interface Record {
    kanseiDate: kintone.fieldTypes.Date;
    contractDate: kintone.fieldTypes.Date;
    contractTotalAmt: kintone.fieldTypes.Number;
    bankBranchName: kintone.fieldTypes.SingleLineText;
    bankName: kintone.fieldTypes.SingleLineText;
    chuukankin: kintone.fieldTypes.Number;
    hikiwatashiJiki: kintone.fieldTypes.Date;
    ルックアップ: kintone.fieldTypes.SingleLineText;
    日付: kintone.fieldTypes.Date;
    chakushuDate: kintone.fieldTypes.Date;
    systemId: kintone.fieldTypes.SingleLineText;
    projName: kintone.fieldTypes.SingleLineText;
    数値_0: kintone.fieldTypes.Number;
    keiyakukin: kintone.fieldTypes.Number;
    chakushukin: kintone.fieldTypes.Number;
    文字列__1行__3: kintone.fieldTypes.SingleLineText;
    文字列__1行__8: kintone.fieldTypes.SingleLineText;
    数値: kintone.fieldTypes.Number;
    paymentMethod: kintone.fieldTypes.RadioButton;
    日付_1: kintone.fieldTypes.Date;
    日付_0: kintone.fieldTypes.Date;
    日付_2: kintone.fieldTypes.Date;
  }
  interface SavedRecord extends Record {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}

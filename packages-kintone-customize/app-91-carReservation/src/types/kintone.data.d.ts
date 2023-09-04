declare namespace DB {
  interface Record {
    備考: kintone.fieldTypes.SingleLineText;
    店舗: kintone.fieldTypes.SingleLineText;
    終了: kintone.fieldTypes.DateTime;
    reserveState: kintone.fieldTypes.RadioButton;
    開始: kintone.fieldTypes.DateTime;
    returnDate: kintone.fieldTypes.DateTime;
    reservingPerson: kintone.fieldTypes.SingleLineText;
    号車: kintone.fieldTypes.SingleLineText;
    期間: kintone.fieldTypes.Calc;
    fullDay: kintone.fieldTypes.CheckBox;
  }
  interface SavedRecord extends Record {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    申請者: kintone.fieldTypes.Creator;
    更新者: kintone.fieldTypes.Modifier;
    レコード番号: kintone.fieldTypes.RecordNumber;
    申請日時: kintone.fieldTypes.CreatedTime;
    更新日時: kintone.fieldTypes.UpdatedTime;
  }
}

declare namespace DB {
  interface Record {
    projId: kintone.fieldTypes.SingleLineText;
    文字列__1行_: kintone.fieldTypes.SingleLineText;
    ルックアップ: kintone.fieldTypes.SingleLineText;
    日付: kintone.fieldTypes.Date;
    projName: kintone.fieldTypes.SingleLineText;
    ラジオボタン: kintone.fieldTypes.RadioButton;
    文字列__1行__0: kintone.fieldTypes.SingleLineText;
    数値_0: kintone.fieldTypes.Number;
    文字列__1行__1: kintone.fieldTypes.SingleLineText;
    文字列__1行__4: kintone.fieldTypes.SingleLineText;
    日付_5: kintone.fieldTypes.Date;
    文字列__1行__5: kintone.fieldTypes.SingleLineText;
    日付_4: kintone.fieldTypes.Date;
    文字列__1行__2: kintone.fieldTypes.SingleLineText;
    文字列__1行__3: kintone.fieldTypes.SingleLineText;
    日付_6: kintone.fieldTypes.Date;
    文字列__1行__8: kintone.fieldTypes.SingleLineText;
    数値: kintone.fieldTypes.Number;
    日付_1: kintone.fieldTypes.Date;
    日付_0: kintone.fieldTypes.Date;
    日付_3: kintone.fieldTypes.Date;
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

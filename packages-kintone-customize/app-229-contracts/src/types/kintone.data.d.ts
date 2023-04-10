declare namespace DB {
  interface Record {
    cocosumoAG_uuid: kintone.fieldTypes.SingleLineText;
    粗利額: kintone.fieldTypes.Number;
    文字列__1行_: kintone.fieldTypes.SingleLineText;
    cocosumokouji_uuid: kintone.fieldTypes.SingleLineText;
    日付: kintone.fieldTypes.Date;
    文字列__1行__0: kintone.fieldTypes.SingleLineText;
    返金: kintone.fieldTypes.RadioButton;
    文字列__1行__1: kintone.fieldTypes.SingleLineText;
    契約金額: kintone.fieldTypes.Number;
    kouji_uuid: kintone.fieldTypes.SingleLineText;
    文字列__1行__4: kintone.fieldTypes.SingleLineText;
    yumeAG_uuid: kintone.fieldTypes.SingleLineText;
    文字列__1行__5: kintone.fieldTypes.SingleLineText;
    文字列__1行__2: kintone.fieldTypes.SingleLineText;
    工事状況: kintone.fieldTypes.RadioButton;
    文字列__1行__3: kintone.fieldTypes.SingleLineText;
    shop_uuid: kintone.fieldTypes.SingleLineText;
    粗利率: kintone.fieldTypes.Calc;
    契約金額_税抜: kintone.fieldTypes.Calc;
    チェックボックス: kintone.fieldTypes.CheckBox;
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

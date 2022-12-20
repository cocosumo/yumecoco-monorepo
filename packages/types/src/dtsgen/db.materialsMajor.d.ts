declare namespace DBMaterialsmajor {
  interface Data {
    備考: kintone.fieldTypes.SingleLineText;
    alternative_name: kintone.fieldTypes.SingleLineText;
    文字列__1行_: kintone.fieldTypes.SingleLineText;
    大項目名: kintone.fieldTypes.SingleLineText;
    uuid: kintone.fieldTypes.SingleLineText;
    code: kintone.fieldTypes.Number;
  }
  interface SavedData extends Data {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}

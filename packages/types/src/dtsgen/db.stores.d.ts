declare namespace DBStores {
  interface Data {
    area: kintone.fieldTypes.SingleLineText;
    文字列__1行_: kintone.fieldTypes.SingleLineText;
    sortNumber: kintone.fieldTypes.Number;
    idPrefix: kintone.fieldTypes.SingleLineText;
    freedial: kintone.fieldTypes.SingleLineText;
    店長: kintone.fieldTypes.Number;
    uuid: kintone.fieldTypes.SingleLineText;
    Eメール: kintone.fieldTypes.SingleLineText;
    住所: kintone.fieldTypes.SingleLineText;
    店長名: kintone.fieldTypes.SingleLineText;
    TEL: kintone.fieldTypes.SingleLineText;
    FAX: kintone.fieldTypes.SingleLineText;
    店舗名: kintone.fieldTypes.SingleLineText;
    territory: kintone.fieldTypes.SingleLineText;
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

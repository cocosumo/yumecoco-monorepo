declare namespace DBMaterialsitem {
  interface Data {
    中項目名: kintone.fieldTypes.SingleLineText;
    原価: kintone.fieldTypes.Number;
    部材名: kintone.fieldTypes.SingleLineText;
    部材利益率: kintone.fieldTypes.Number;
    大項目名: kintone.fieldTypes.SingleLineText;
    中項目: kintone.fieldTypes.Number;
    単位: kintone.fieldTypes.DropDown;
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

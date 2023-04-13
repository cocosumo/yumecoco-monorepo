declare namespace DB {
  interface Record {
    yumeAGId: kintone.fieldTypes.SingleLineText;
    contractDate: kintone.fieldTypes.Date;
    粗利額: kintone.fieldTypes.Number;
    cocosumoKoujiId: kintone.fieldTypes.SingleLineText;
    cocosumoAGName: kintone.fieldTypes.SingleLineText;
    cocosumoKoujiName: kintone.fieldTypes.SingleLineText;
    storeName: kintone.fieldTypes.SingleLineText;
    projName: kintone.fieldTypes.SingleLineText;
    projTypeName: kintone.fieldTypes.SingleLineText;
    storeId: kintone.fieldTypes.SingleLineText;
    custName: kintone.fieldTypes.SingleLineText;
    返金: kintone.fieldTypes.RadioButton;
    契約金額: kintone.fieldTypes.Number;
    yumeAGName: kintone.fieldTypes.SingleLineText;
    工事状況: kintone.fieldTypes.RadioButton;
    projTypeId: kintone.fieldTypes.SingleLineText;
    cocosumoAGId: kintone.fieldTypes.SingleLineText;
    粗利率: kintone.fieldTypes.Calc;
    契約金額_税抜: kintone.fieldTypes.Calc;
    自社物件: kintone.fieldTypes.CheckBox;
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

declare namespace DBOrderbudget {
  interface Data {
    projId: kintone.fieldTypes.SingleLineText;
    items: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          supplierName: kintone.fieldTypes.SingleLineText;
          middleItem: kintone.fieldTypes.SingleLineText;
          unitPrice: kintone.fieldTypes.Number;
          majorItem: kintone.fieldTypes.SingleLineText;
          unit: kintone.fieldTypes.SingleLineText;
          orderAmount: kintone.fieldTypes.Number;
          material: kintone.fieldTypes.SingleLineText;
          orderId: kintone.fieldTypes.SingleLineText;
          tax: kintone.fieldTypes.Number;
          数値_1: kintone.fieldTypes.Number;
        };
      }>;
    };
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

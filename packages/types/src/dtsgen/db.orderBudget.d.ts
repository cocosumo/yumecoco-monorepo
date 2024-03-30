declare namespace DBOrderbudget {
  interface Data {
    projId: kintone.fieldTypes.SingleLineText;
    uuid: kintone.fieldTypes.SingleLineText;
    items: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          supplierName: kintone.fieldTypes.SingleLineText;
          middleItem: kintone.fieldTypes.SingleLineText;
          majorItem: kintone.fieldTypes.SingleLineText;
          unit: kintone.fieldTypes.SingleLineText;
          quantity: kintone.fieldTypes.Number;
          material: kintone.fieldTypes.SingleLineText;
          orderId: kintone.fieldTypes.SingleLineText;
          costPrice: kintone.fieldTypes.Number;
          taxRate: kintone.fieldTypes.Number;
          orderAmountAfterTax: kintone.fieldTypes.Number;
          orderAmountBeforeTax: kintone.fieldTypes.Number;
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

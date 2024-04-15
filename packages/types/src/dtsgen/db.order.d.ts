declare namespace DBOrder {
  interface Data {
    supplierName: kintone.fieldTypes.SingleLineText;
    projId: kintone.fieldTypes.SingleLineText;
    supplierEmail: kintone.fieldTypes.SingleLineText;
    supplierId: kintone.fieldTypes.SingleLineText;
    orderId: kintone.fieldTypes.SingleLineText;
    uuid: kintone.fieldTypes.SingleLineText;
    totalOrderAmount: kintone.fieldTypes.SingleLineText;
    officerName: kintone.fieldTypes.SingleLineText;
    orderDate: kintone.fieldTypes.SingleLineText;
    officerId: kintone.fieldTypes.SingleLineText;
    remarks: kintone.fieldTypes.MultiLineText;
    orderName: kintone.fieldTypes.SingleLineText;
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

declare namespace DBInvoiceb2b {
  interface Data {
    supplierName: kintone.fieldTypes.SingleLineText;
    projId: kintone.fieldTypes.SingleLineText;
    supplierId: kintone.fieldTypes.SingleLineText;
    cocoAG: kintone.fieldTypes.SingleLineText;
    orderId: kintone.fieldTypes.SingleLineText;
    projName: kintone.fieldTypes.SingleLineText;
    invoiceAmount: kintone.fieldTypes.Date;
    businessNumber: kintone.fieldTypes.SingleLineText;
    invoiceDueDate: kintone.fieldTypes.Date;
    orderAmount: kintone.fieldTypes.Number;
    storeName: kintone.fieldTypes.SingleLineText;
    deliveryDate: kintone.fieldTypes.Date;
    invoiceStatus: kintone.fieldTypes.SingleLineText;
    status: kintone.fieldTypes.SingleLineText;
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

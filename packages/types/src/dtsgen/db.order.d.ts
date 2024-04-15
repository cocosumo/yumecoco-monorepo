declare namespace DBOrder {
  interface Data {
    projId: kintone.fieldTypes.SingleLineText;
    emailCc: kintone.fieldTypes.SingleLineText;
    supplierId: kintone.fieldTypes.SingleLineText;
    supplicerOfficerName: kintone.fieldTypes.SingleLineText;
    uuid: kintone.fieldTypes.SingleLineText;
    supplierOfficerTel: kintone.fieldTypes.SingleLineText;
    emailBcc: kintone.fieldTypes.SingleLineText;
    orderDataId: kintone.fieldTypes.SingleLineText;
    orderName: kintone.fieldTypes.SingleLineText;
    supplierName: kintone.fieldTypes.SingleLineText;
    supplierEmail: kintone.fieldTypes.SingleLineText;
    expectedDeliveryDate: kintone.fieldTypes.SingleLineText;
    orderMethod: kintone.fieldTypes.DropDown;
    supplierOfficerId: kintone.fieldTypes.SingleLineText;
    orderDate: kintone.fieldTypes.SingleLineText;
    supplierOfficerEmail: kintone.fieldTypes.SingleLineText;
    remarks: kintone.fieldTypes.MultiLineText;
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

declare namespace DBCompanydetails {
  interface Data {
    kenchikushiJimushoName: kintone.fieldTypes.SingleLineText;
    companyName: kintone.fieldTypes.SingleLineText;
    companyTel: kintone.fieldTypes.SingleLineText;
    kensetsugyoKyoka: kintone.fieldTypes.SingleLineText;
    companyAddress: kintone.fieldTypes.SingleLineText;
    kenchikushiJimushoRegister: kintone.fieldTypes.SingleLineText;
    takkengyoNumber: kintone.fieldTypes.SingleLineText;
    invoiceSystemNumber: kintone.fieldTypes.SingleLineText;
    representative: kintone.fieldTypes.SingleLineText;
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

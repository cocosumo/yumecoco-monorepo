declare namespace DBInvoices {
  interface Data {
    billingAmount: kintone.fieldTypes.Number;
    slipNumber: kintone.fieldTypes.SingleLineText;
    plannedPaymentDate: kintone.fieldTypes.Date;
    uuid: kintone.fieldTypes.SingleLineText;
    issuedDateTime: kintone.fieldTypes.DateTime;
    custGroupId: kintone.fieldTypes.SingleLineText;
    exceedChecked: kintone.fieldTypes.Number;
    estimateLists: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          projId: kintone.fieldTypes.SingleLineText;
          dataId: kintone.fieldTypes.SingleLineText;
          projTypeName: kintone.fieldTypes.SingleLineText;
          estimateId: kintone.fieldTypes.SingleLineText;
          amountPerContract: kintone.fieldTypes.Number;
          paymentType: kintone.fieldTypes.SingleLineText;
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

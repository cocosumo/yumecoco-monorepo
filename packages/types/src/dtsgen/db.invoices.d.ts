declare namespace DBInvoices {
  interface Data {
    amountType: kintone.fieldTypes.SingleLineText;
    projId: kintone.fieldTypes.SingleLineText;
    billingAmount: kintone.fieldTypes.Number;
    slipNumber: kintone.fieldTypes.SingleLineText;
    excessChecked: kintone.fieldTypes.Number;
    plannedPaymentDate: kintone.fieldTypes.Date;
    uuid: kintone.fieldTypes.SingleLineText;
    issuedDateTime: kintone.fieldTypes.DateTime;
    estimateLists: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          estimateId: kintone.fieldTypes.Number;
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

declare namespace DBInvoices {
  interface Data {
    amountType: kintone.fieldTypes.SingleLineText;
    projId: kintone.fieldTypes.Number;
    billingAmount: kintone.fieldTypes.Number;
    plannedPaymentDate: kintone.fieldTypes.Date;
    estimateLists: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          estimateId: kintone.fieldTypes.Number;
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

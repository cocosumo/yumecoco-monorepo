declare namespace DBInvoiceb2c {
  interface Data {
    payMethodPlan: kintone.fieldTypes.SingleLineText;
    projId: kintone.fieldTypes.SingleLineText;
    projDataId: kintone.fieldTypes.SingleLineText;
    uuid: kintone.fieldTypes.SingleLineText;
    invoiceDataId: kintone.fieldTypes.SingleLineText;
    billingTotalAmount: kintone.fieldTypes.SingleLineText;
    custGroupId: kintone.fieldTypes.SingleLineText;
    paymentStatus: kintone.fieldTypes.SingleLineText;
    invoiceIssueDate: kintone.fieldTypes.Date;
    projName: kintone.fieldTypes.SingleLineText;
    contractIds: kintone.fieldTypes.SingleLineText;
    store: kintone.fieldTypes.SingleLineText;
    custName: kintone.fieldTypes.SingleLineText;
    PersonInCharge: kintone.fieldTypes.SingleLineText;
    invoiceStatus: kintone.fieldTypes.SingleLineText;
    scheduledPaymentDate: kintone.fieldTypes.Date;
    remarks: kintone.fieldTypes.MultiLineText;
    invoiceDetails: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          billingAmountAfterTax: kintone.fieldTypes.Number;
          otherDetails: kintone.fieldTypes.SingleLineText;
          inovoiceItem: kintone.fieldTypes.SingleLineText;
        };
      }>;
    };
    paymentDetails: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          itemRemarks: kintone.fieldTypes.SingleLineText;
          paymentAmountAfterTax: kintone.fieldTypes.SingleLineText;
          paymentDate: kintone.fieldTypes.Date;
          payMethodActual: kintone.fieldTypes.SingleLineText;
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
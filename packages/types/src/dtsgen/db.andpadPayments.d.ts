declare namespace DBAndpadpayments {
  interface Data {
    projId: kintone.fieldTypes.SingleLineText;
    handlingFee: kintone.fieldTypes.Number;
    expectedPaymentDate: kintone.fieldTypes.Date;
    paymentAmount: kintone.fieldTypes.Number;
    paymentType: kintone.fieldTypes.SingleLineText;
    receiptIssueDate: kintone.fieldTypes.Date;
    inquiryId: kintone.fieldTypes.SingleLineText;
    deleteStatus: kintone.fieldTypes.SingleLineText;
    mainOIC: kintone.fieldTypes.SingleLineText;
    ID: kintone.fieldTypes.SingleLineText;
    paymentStatus: kintone.fieldTypes.SingleLineText;
    systemId: kintone.fieldTypes.SingleLineText;
    mainOICStore: kintone.fieldTypes.SingleLineText;
    andpadProjName: kintone.fieldTypes.SingleLineText;
    andpadContractId: kintone.fieldTypes.SingleLineText;
    custName: kintone.fieldTypes.SingleLineText;
    billingDate: kintone.fieldTypes.Date;
    paymentMethod: kintone.fieldTypes.SingleLineText;
    expectedPaymentAmount: kintone.fieldTypes.Number;
    paymentDate: kintone.fieldTypes.Date;
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

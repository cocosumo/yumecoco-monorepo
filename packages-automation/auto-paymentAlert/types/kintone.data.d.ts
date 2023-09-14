declare namespace DBPaymentreminder {
  interface Data {
    area: kintone.fieldTypes.SingleLineText;
    projId: kintone.fieldTypes.SingleLineText;
    expectedPaymentDate: kintone.fieldTypes.Date;
    projType: kintone.fieldTypes.SingleLineText;
    alertDate: kintone.fieldTypes.Date;
    andpadStatus: kintone.fieldTypes.SingleLineText;
    totalContractAmount: kintone.fieldTypes.Number;
    andpadUrl: kintone.fieldTypes.Link;
    contractId: kintone.fieldTypes.SingleLineText;
    alertState: kintone.fieldTypes.SingleLineText;

    alertTarget: kintone.fieldTypes.UserSelect;
    paymentTable: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          andpadExpectedPaymentDate: kintone.fieldTypes.Date;
          andpadProjName: kintone.fieldTypes.SingleLineText;
          andpadId: kintone.fieldTypes.SingleLineText;
          andpadPaymentDate: kintone.fieldTypes.Date;
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

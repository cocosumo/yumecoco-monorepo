declare namespace DBProjestimates {
  interface Data {
    contractDate: kintone.fieldTypes.Date;
    envCompleteDate: kintone.fieldTypes.DateTime;
    updateByName: kintone.fieldTypes.SingleLineText;
    hasRefund: kintone.fieldTypes.Number;
    uuid: kintone.fieldTypes.SingleLineText;
    税: kintone.fieldTypes.Number;
    completeDate: kintone.fieldTypes.Date;
    payDestination: kintone.fieldTypes.SingleLineText;
    顧客名: kintone.fieldTypes.SingleLineText;
    payMethod: kintone.fieldTypes.SingleLineText;
    voidedEnvelopes: kintone.fieldTypes.SingleLineText;
    工事種別名: kintone.fieldTypes.SingleLineText;
    工事名称: kintone.fieldTypes.SingleLineText;
    envId: kintone.fieldTypes.SingleLineText;
    envStatus: kintone.fieldTypes.SingleLineText;
    updatedById: kintone.fieldTypes.Number;
    startDaysAfterContract: kintone.fieldTypes.Number;
    updateDateTime: kintone.fieldTypes.DateTime;
    signMethod: kintone.fieldTypes.SingleLineText;
    startDate: kintone.fieldTypes.Date;
    projId: kintone.fieldTypes.SingleLineText;
    envRecipients: kintone.fieldTypes.SingleLineText;
    daikokuDataId: kintone.fieldTypes.SingleLineText;
    finishDaysAfterContract: kintone.fieldTypes.Number;
    dataId: kintone.fieldTypes.SingleLineText;
    estimateStatus: kintone.fieldTypes.SingleLineText;
    subsidyAmt: kintone.fieldTypes.Number;
    storeName: kintone.fieldTypes.SingleLineText;
    custGroupId: kintone.fieldTypes.SingleLineText;
    refundAmt: kintone.fieldTypes.Number;
    hasSubsidy: kintone.fieldTypes.Number;
    工事種別利益: kintone.fieldTypes.Number;
    projTypeId: kintone.fieldTypes.SingleLineText;
    subsidyMethod: kintone.fieldTypes.Number;
    finishDate: kintone.fieldTypes.Date;
    remarks: kintone.fieldTypes.MultiLineText;
    totalPaymentAmt: kintone.fieldTypes.Calc;
    isForPayment: kintone.fieldTypes.CheckBox;

    envDocFileKeys: kintone.fieldTypes.File;
    内訳: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          備考: kintone.fieldTypes.SingleLineText;
          大項目: kintone.fieldTypes.SingleLineText;
          数量: kintone.fieldTypes.Number;
          単価: kintone.fieldTypes.Number;
          税率: kintone.fieldTypes.Number;
          原価: kintone.fieldTypes.Number;
          部材名: kintone.fieldTypes.SingleLineText;
          中項目: kintone.fieldTypes.SingleLineText;
          部材備考: kintone.fieldTypes.SingleLineText;
          単位: kintone.fieldTypes.SingleLineText;
        };
      }>;
    };
    支払い: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          paymentAmt: kintone.fieldTypes.Number;
          isPayEnabled: kintone.fieldTypes.Number;
          paymentDate: kintone.fieldTypes.Date;
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
    作成日時: kintone.fieldTypes.CreatedTime;
    更新日時: kintone.fieldTypes.UpdatedTime;
  }
}

declare namespace DBContracts {
  interface Data {
    contractDate: kintone.fieldTypes.Date;
    envCompleteDate: kintone.fieldTypes.DateTime;
    contractType: kintone.fieldTypes.SingleLineText;
    projEstimateId: kintone.fieldTypes.SingleLineText;
    hasRefund: kintone.fieldTypes.RadioButton;
    uuid: kintone.fieldTypes.SingleLineText;
    initialAmt: kintone.fieldTypes.Number;
    payDestination: kintone.fieldTypes.SingleLineText;
    finalAmt: kintone.fieldTypes.Number;
    payMethod: kintone.fieldTypes.SingleLineText;
    envelopeId: kintone.fieldTypes.SingleLineText;
    voidedEnvelopes: kintone.fieldTypes.SingleLineText;
    tax: kintone.fieldTypes.Number;
    startDaysAfterContract: kintone.fieldTypes.Number;
    contractAddType: kintone.fieldTypes.SingleLineText;
    contractAmt: kintone.fieldTypes.Number;
    startDate: kintone.fieldTypes.Date;
    signMethod: kintone.fieldTypes.SingleLineText;
    projId: kintone.fieldTypes.SingleLineText;
    totalProfit: kintone.fieldTypes.Number;
    envRecipients: kintone.fieldTypes.SingleLineText;
    finalAmtDate: kintone.fieldTypes.Date;
    finishDaysAfterContract: kintone.fieldTypes.Number;
    interimAmt: kintone.fieldTypes.Number;
    contractAmtDate: kintone.fieldTypes.Date;
    subsidyAmt: kintone.fieldTypes.Number;
    totalContractAmt: kintone.fieldTypes.Number;
    storeName: kintone.fieldTypes.SingleLineText;
    deliveryDate: kintone.fieldTypes.Date;
    refundAmt: kintone.fieldTypes.Number;
    systemId: kintone.fieldTypes.SingleLineText;
    hasSubsidy: kintone.fieldTypes.RadioButton;
    projName: kintone.fieldTypes.SingleLineText;
    interimAmtDate: kintone.fieldTypes.Date;
    othersAmt: kintone.fieldTypes.Number;
    initialAmtDate: kintone.fieldTypes.Date;
    subsidyMethod: kintone.fieldTypes.SingleLineText;
    finishDate: kintone.fieldTypes.Date;
    othersAmtDate: kintone.fieldTypes.Date;
    envelopeStatus: kintone.fieldTypes.SingleLineText;

    envDocFileKeys: kintone.fieldTypes.File;
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

declare namespace DBContracts {
  interface Data {
    initialPayment: kintone.fieldTypes.Number;
    projId: kintone.fieldTypes.SingleLineText;
    contractDate: kintone.fieldTypes.Date;
    envCompleteDate: kintone.fieldTypes.SingleLineText;
    initialPaymentDate: kintone.fieldTypes.Date;
    interimPaymentDate: kintone.fieldTypes.Date;
    envRecipients: kintone.fieldTypes.SingleLineText;
    finishDaysAfterContract: kintone.fieldTypes.Number;
    uuid: kintone.fieldTypes.SingleLineText;
    completeDate: kintone.fieldTypes.Date;
    payDestination: kintone.fieldTypes.SingleLineText;
    finalPayment: kintone.fieldTypes.Number;
    payMethod: kintone.fieldTypes.SingleLineText;
    envelopeId: kintone.fieldTypes.SingleLineText;
    contractAmtDate: kintone.fieldTypes.Date;
    subsidyAmt: kintone.fieldTypes.Number;
    totalContractAmt: kintone.fieldTypes.Number;
    storeName: kintone.fieldTypes.SingleLineText;
    voidedEnvelopes: kintone.fieldTypes.SingleLineText;
    interimPayment: kintone.fieldTypes.Number;
    refundAmt: kintone.fieldTypes.Number;
    systemId: kintone.fieldTypes.SingleLineText;
    hasSubsidy: kintone.fieldTypes.RadioButton;
    projName: kintone.fieldTypes.SingleLineText;
    finalPaymentDate: kintone.fieldTypes.Date;
    startDaysAfterContract: kintone.fieldTypes.Number;
    withRefund: kintone.fieldTypes.RadioButton;
    isForPayment: kintone.fieldTypes.RadioButton;
    projectCost: kintone.fieldTypes.Number;
    subsidyMethod: kintone.fieldTypes.SingleLineText;
    contractAmt: kintone.fieldTypes.Number;
    finishDate: kintone.fieldTypes.Date;
    リンク: kintone.fieldTypes.Link;
    startDate: kintone.fieldTypes.Date;
    signMethod: kintone.fieldTypes.SingleLineText;
    envelopeStatus: kintone.fieldTypes.SingleLineText;

    envDocFileKeys: kintone.fieldTypes.File;
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

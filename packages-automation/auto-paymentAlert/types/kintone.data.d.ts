declare namespace DBPaymentreminder {
  interface Data {
    projId: kintone.fieldTypes.SingleLineText;
    contractDate: kintone.fieldTypes.Date;
    expectedPaymentDate: kintone.fieldTypes.Date;
    projType: kintone.fieldTypes.SingleLineText;
    totalContractAmount: kintone.fieldTypes.Number;
    scheduledAlertDate: kintone.fieldTypes.Date;
    andpaddepositamount: kintone.fieldTypes.SingleLineText;
    alertState: kintone.fieldTypes.SingleLineText;
    reminderDate: kintone.fieldTypes.DropDown;
    area: kintone.fieldTypes.SingleLineText;
    projName: kintone.fieldTypes.SingleLineText;
    lastAlertDate: kintone.fieldTypes.Date;
    andpadUrl: kintone.fieldTypes.Link;
    contractId: kintone.fieldTypes.SingleLineText;
    notificationSettings: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          chatworkRoomId: kintone.fieldTypes.SingleLineText;
          alertTargetId: kintone.fieldTypes.SingleLineText;
          alertTargetName: kintone.fieldTypes.SingleLineText;
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

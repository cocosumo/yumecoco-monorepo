declare namespace DBCustgroups {
  interface Data {
    projectCount: kintone.fieldTypes.Number;
    memo: kintone.fieldTypes.MultiLineText;
    storeId: kintone.fieldTypes.SingleLineText;
    custNames: kintone.fieldTypes.SingleLineText;
    uuid: kintone.fieldTypes.SingleLineText;
    cocoAGNames: kintone.fieldTypes.SingleLineText;
    isDeleted: kintone.fieldTypes.Number;
    yumeAGNames: kintone.fieldTypes.SingleLineText;
    custType: kintone.fieldTypes.RadioButton;
    storeName: kintone.fieldTypes.SingleLineText;
    territory: kintone.fieldTypes.SingleLineText;
    storeCode: kintone.fieldTypes.SingleLineText;
    agents: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          employeeName: kintone.fieldTypes.SingleLineText;
          agentType: kintone.fieldTypes.SingleLineText;
          employeeId: kintone.fieldTypes.SingleLineText;
          email: kintone.fieldTypes.SingleLineText;
        };
      }>;
    };
    members: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          custNameReading: kintone.fieldTypes.SingleLineText;
          address2: kintone.fieldTypes.SingleLineText;
          address1: kintone.fieldTypes.SingleLineText;
          custId: kintone.fieldTypes.SingleLineText;
          index: kintone.fieldTypes.Number;
          postal: kintone.fieldTypes.SingleLineText;
          isSameAsMain: kintone.fieldTypes.Number;
          customerName: kintone.fieldTypes.SingleLineText;
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

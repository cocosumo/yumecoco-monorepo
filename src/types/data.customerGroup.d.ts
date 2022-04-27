declare namespace CustomerGroupTypes {
  interface Data {
    storeId: kintone.fieldTypes.Number;
    custType: kintone.fieldTypes.RadioButton;
    storeName: kintone.fieldTypes.SingleLineText;
    territory: kintone.fieldTypes.SingleLineText;
    status: kintone.fieldTypes.SingleLineText;
    projects: {
      type: 'SUBTABLE';
      value: {
        id: string;
        value: {
          cocoConst2: kintone.fieldTypes.Number;
          cocoConst1: kintone.fieldTypes.Number;
          cocoConst2Name: kintone.fieldTypes.SingleLineText;
          constructionName: kintone.fieldTypes.SingleLineText;
          constructionId: kintone.fieldTypes.Number;
          cocoConst1Name: kintone.fieldTypes.SingleLineText;
        };
      }[];
    };
    agents: {
      type: 'SUBTABLE';
      value: {
        id: string;
        value: {
          employeeName: kintone.fieldTypes.SingleLineText;
          agentType: kintone.fieldTypes.SingleLineText;
          employeeId: kintone.fieldTypes.Number;
        };
      }[];
    };
    members: {
      type: 'SUBTABLE';
      value: {
        id: string;
        value: {
          address: kintone.fieldTypes.SingleLineText;
          customerId: kintone.fieldTypes.Number;
          customerName: kintone.fieldTypes.SingleLineText;
        };
      }[];
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

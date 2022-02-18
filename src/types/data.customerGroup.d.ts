declare namespace CustomerGroupTypes {
  interface Data {
    storeName: kintone.fieldTypes.SingleLineText;
    storeId: kintone.fieldTypes.Number;
    members: {
      type: 'SUBTABLE';
      value: {
        id: string;
        value: {
          customerId: kintone.fieldTypes.Number;
          customerName: kintone.fieldTypes.SingleLineText;
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

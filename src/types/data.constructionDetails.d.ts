declare namespace ConstructionDetails {
  interface Data {
    constructionTypeId: kintone.fieldTypes.Number;
    constructionType: kintone.fieldTypes.SingleLineText;
    address2: kintone.fieldTypes.SingleLineText;
    addressKari: kintone.fieldTypes.SingleLineText;
    address1: kintone.fieldTypes.SingleLineText;
    storeId: kintone.fieldTypes.Number;
    isAgentConfirmed: kintone.fieldTypes.SingleLineText;
    custGroupId: kintone.fieldTypes.Number;
    constructionName: kintone.fieldTypes.SingleLineText;
    storeName: kintone.fieldTypes.SingleLineText;
    postal: kintone.fieldTypes.SingleLineText;
    isChkAddressKari: kintone.fieldTypes.Number;
    buildingType: kintone.fieldTypes.SingleLineText;
    agents: {
      type: "SUBTABLE";
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
      type: "SUBTABLE";
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

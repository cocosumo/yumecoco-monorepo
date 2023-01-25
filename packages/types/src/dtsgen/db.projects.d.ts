declare namespace DBProjects {
  interface Data {
    schedContractDate: kintone.fieldTypes.Date;
    addressKari: kintone.fieldTypes.SingleLineText;
    cancelStatus: kintone.fieldTypes.SingleLineText;
    memo: kintone.fieldTypes.SingleLineText;
    custNames: kintone.fieldTypes.SingleLineText;
    uuid: kintone.fieldTypes.SingleLineText;
    schedContractPrice: kintone.fieldTypes.Number;
    cocoAGNames: kintone.fieldTypes.SingleLineText;
    dataId: kintone.fieldTypes.SingleLineText;
    rank: kintone.fieldTypes.SingleLineText;
    estatePurchaseDate: kintone.fieldTypes.Date;
    custGroupId: kintone.fieldTypes.SingleLineText;
    isChkAddressKari: kintone.fieldTypes.Number;
    planApplicationDate: kintone.fieldTypes.Date;
    address2: kintone.fieldTypes.SingleLineText;
    address1: kintone.fieldTypes.SingleLineText;
    projName: kintone.fieldTypes.SingleLineText;
    projTypeName: kintone.fieldTypes.SingleLineText;
    store: kintone.fieldTypes.SingleLineText;
    storeId: kintone.fieldTypes.SingleLineText;
    cocoConstNames: kintone.fieldTypes.SingleLineText;
    projTypeId: kintone.fieldTypes.SingleLineText;
    isAgentConfirmed: kintone.fieldTypes.SingleLineText;
    yumeAGNames: kintone.fieldTypes.SingleLineText;
    postal: kintone.fieldTypes.SingleLineText;
    buildingType: kintone.fieldTypes.SingleLineText;
    status: kintone.fieldTypes.SingleLineText;
    storeCode: kintone.fieldTypes.SingleLineText;
    agents: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          agentId: kintone.fieldTypes.SingleLineText;
          agentType: kintone.fieldTypes.SingleLineText;
          agentName: kintone.fieldTypes.SingleLineText;
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

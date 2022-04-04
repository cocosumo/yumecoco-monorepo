declare namespace ConstructionDetails {
  interface Data {
    constructionTypeId: kintone.fieldTypes.Number;
    constructionType: kintone.fieldTypes.SingleLineText;
    address2: kintone.fieldTypes.SingleLineText;
    addressKari: kintone.fieldTypes.SingleLineText;
    address1: kintone.fieldTypes.SingleLineText;
    agent2: kintone.fieldTypes.SingleLineText;
    agent1: kintone.fieldTypes.SingleLineText;
    agent1Id: kintone.fieldTypes.Number;
    isAgentConfirmed: kintone.fieldTypes.SingleLineText;
    agent2Id: kintone.fieldTypes.Number;
    custGroupId: kintone.fieldTypes.Number;
    constructionName: kintone.fieldTypes.SingleLineText;
    postal: kintone.fieldTypes.SingleLineText;
    isChkAddressKari: kintone.fieldTypes.Number;
    buildingType: kintone.fieldTypes.SingleLineText;
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

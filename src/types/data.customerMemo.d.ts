declare namespace CustomerMemoTypes {
  interface Data {
    groupId: kintone.fieldTypes.Number;
    custName: kintone.fieldTypes.SingleLineText;
    memoType: kintone.fieldTypes.SingleLineText;
    contents: kintone.fieldTypes.MultiLineText;
    custId: kintone.fieldTypes.Number;

    notifyTo: kintone.fieldTypes.UserSelect;
  }
  interface SavedData extends Data {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    createdBy: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    createdTime: kintone.fieldTypes.CreatedTime;
  }
}

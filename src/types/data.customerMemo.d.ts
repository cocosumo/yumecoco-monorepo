declare namespace CustomerMemoTypes {
  interface Data {
    recordId: kintone.fieldTypes.Number;
    contents: kintone.fieldTypes.MultiLineText;
    memoType: kintone.fieldTypes.SingleLineText;

    notifyTo: kintone.fieldTypes.UserSelect;
  }
  interface SavedData extends Data {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    createdBy: kintone.fieldTypes.Creator;
    更新者: kintone.fieldTypes.Modifier;
    レコード番号: kintone.fieldTypes.RecordNumber;
    createdTime: kintone.fieldTypes.CreatedTime;
    更新日時: kintone.fieldTypes.UpdatedTime;
  }
}

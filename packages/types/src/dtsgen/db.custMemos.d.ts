declare namespace DBCustmemos {
  interface Data {
    memoType: kintone.fieldTypes.SingleLineText;
    uuid: kintone.fieldTypes.SingleLineText;
<<<<<<< Updated upstream
    recordId: kintone.fieldTypes.Number;
    contents: kintone.fieldTypes.MultiLineText;
=======
    contents: kintone.fieldTypes.MultiLineText;
    custGroupId: kintone.fieldTypes.SingleLineText;
>>>>>>> Stashed changes

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

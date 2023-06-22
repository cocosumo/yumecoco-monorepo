declare namespace DBTicketsystem {
  interface Data {
    completedTime: kintone.fieldTypes.DateTime;
    importance: kintone.fieldTypes.DropDown;
    requestMethod: kintone.fieldTypes.DropDown;
    dueDate: kintone.fieldTypes.Date;
    title: kintone.fieldTypes.SingleLineText;
    priority: kintone.fieldTypes.DropDown;
    requestTime: kintone.fieldTypes.DateTime;
    announcementTitle: kintone.fieldTypes.SingleLineText;
    details: kintone.fieldTypes.RichText;

    requestor: kintone.fieldTypes.UserSelect;
    attachment: kintone.fieldTypes.File;
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

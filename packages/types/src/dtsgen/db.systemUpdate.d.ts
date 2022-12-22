declare namespace DBSystemupdate {
  interface Data {
    releaseDate: kintone.fieldTypes.Date;
    contents: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          details: kintone.fieldTypes.SingleLineText;
          category: kintone.fieldTypes.SingleLineText;
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

declare namespace DBPostalcode {
  interface Data {
    town: kintone.fieldTypes.SingleLineText;
    city: kintone.fieldTypes.SingleLineText;
    postalCode: kintone.fieldTypes.SingleLineText;
    prefReading: kintone.fieldTypes.SingleLineText;
    townReading: kintone.fieldTypes.SingleLineText;
    pref: kintone.fieldTypes.SingleLineText;
    cityReading: kintone.fieldTypes.SingleLineText;
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

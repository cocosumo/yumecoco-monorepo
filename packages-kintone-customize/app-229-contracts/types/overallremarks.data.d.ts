declare namespace DBOverall {
  interface Record {
    toMonthInt: kintone.fieldTypes.Number;
    toMonthAmount: kintone.fieldTypes.Number;
    eastSuccess: kintone.fieldTypes.MultiLineText;
    eastFailed: kintone.fieldTypes.MultiLineText;
    westSuccess: kintone.fieldTypes.MultiLineText;
    improvement: kintone.fieldTypes.MultiLineText;
    unachieved: kintone.fieldTypes.MultiLineText;
    prospectAmount: kintone.fieldTypes.Number;
    prospectInt: kintone.fieldTypes.Number;
    reportDate: kintone.fieldTypes.Date;
    westFailed: kintone.fieldTypes.MultiLineText;
    reportMonth: kintone.fieldTypes.Calc;
  }
  interface SavedRecord extends Record {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}

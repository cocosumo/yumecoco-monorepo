declare namespace DBInhouseprojtypes {
  interface Data {
    description: kintone.fieldTypes.MultiLineText;
    label: kintone.fieldTypes.SingleLineText;
    profitRate: kintone.fieldTypes.Number;
    uuid: kintone.fieldTypes.SingleLineText;
    assessPoint: kintone.fieldTypes.Number;
    sortNum: kintone.fieldTypes.Number;
    テーブル: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          thresholdLower: kintone.fieldTypes.Number;
          thresholdUpper: kintone.fieldTypes.Number;
          assessPointOptional: kintone.fieldTypes.Number;
          label_0: kintone.fieldTypes.SingleLineText;
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

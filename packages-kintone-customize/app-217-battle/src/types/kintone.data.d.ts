declare namespace DB {
  interface Record {
    契約日: kintone.fieldTypes.Date;
    point: kintone.fieldTypes.Number;
    種類: kintone.fieldTypes.SingleLineText;
    案件: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          契約者名: kintone.fieldTypes.SingleLineText;
        };
      }>;
    };
    担当者: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          チーム: kintone.fieldTypes.SingleLineText;
          担当者名: kintone.fieldTypes.SingleLineText;
          percent: kintone.fieldTypes.DropDown;
          percent_1: kintone.fieldTypes.Calc;
          personal_point: kintone.fieldTypes.Calc;
        };
      }>;
    };
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

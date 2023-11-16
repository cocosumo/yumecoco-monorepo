declare namespace DBSettings {
  interface Record {
    アプリ名: kintone.fieldTypes.SingleLineText;
    レコードタイトル: kintone.fieldTypes.SingleLineText;
    文字列__複数行_: kintone.fieldTypes.MultiLineText;
    コード: kintone.fieldTypes.Number;
    設定: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          設定名: kintone.fieldTypes.SingleLineText;
          説明: kintone.fieldTypes.MultiLineText;
          設定値: kintone.fieldTypes.MultiLineText;
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

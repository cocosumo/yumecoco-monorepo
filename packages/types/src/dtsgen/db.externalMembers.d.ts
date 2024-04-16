declare namespace DBExternalmembers {
  interface Data {
    shop: kintone.fieldTypes.SingleLineText;
    andpadUserID: kintone.fieldTypes.SingleLineText;
    invitation: kintone.fieldTypes.RadioButton;
    companyName: kintone.fieldTypes.SingleLineText;
    ラジオボタン: kintone.fieldTypes.RadioButton;
    userName: kintone.fieldTypes.SingleLineText;
    uuid: kintone.fieldTypes.SingleLineText;
    日時: kintone.fieldTypes.DateTime;
    tel: kintone.fieldTypes.SingleLineText;
    jobType: kintone.fieldTypes.DropDown;
    email: kintone.fieldTypes.SingleLineText;
    status: kintone.fieldTypes.RadioButton;
    日付: kintone.fieldTypes.Date;

    affiliation: kintone.fieldTypes.CheckBox;
    チェックボックス: kintone.fieldTypes.CheckBox;
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

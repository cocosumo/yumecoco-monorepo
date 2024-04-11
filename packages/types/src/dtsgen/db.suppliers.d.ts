declare namespace DBSuppliers {
  interface Data {
    addressSecond: kintone.fieldTypes.SingleLineText;
    orderMail: kintone.fieldTypes.SingleLineText;
    mail: kintone.fieldTypes.SingleLineText;
    lastRegistrationDate: kintone.fieldTypes.Date;
    businessName: kintone.fieldTypes.SingleLineText;
    setting: kintone.fieldTypes.DropDown;
    registrationDate: kintone.fieldTypes.Date;
    tel: kintone.fieldTypes.SingleLineText;
    fax: kintone.fieldTypes.SingleLineText;
    businessAddress: kintone.fieldTypes.SingleLineText;
    andpad: kintone.fieldTypes.Number;
    lapseDate: kintone.fieldTypes.Date;
    数値_0: kintone.fieldTypes.Number;
    supplierName_ruby: kintone.fieldTypes.SingleLineText;
    ドロップダウン_1: kintone.fieldTypes.DropDown;
    ドロップダウン_0: kintone.fieldTypes.DropDown;
    transfer: kintone.fieldTypes.Number;
    postCode: kintone.fieldTypes.SingleLineText;
    bankHolder: kintone.fieldTypes.SingleLineText;
    ドロップダウン_2: kintone.fieldTypes.DropDown;
    status: kintone.fieldTypes.RadioButton;
    cancelDate: kintone.fieldTypes.Date;
    prefectures: kintone.fieldTypes.DropDown;
    addressFirst: kintone.fieldTypes.SingleLineText;
    bankName: kintone.fieldTypes.SingleLineText;
    bankHolder_ruby: kintone.fieldTypes.SingleLineText;
    tradeName: kintone.fieldTypes.SingleLineText;
    bankCord: kintone.fieldTypes.Number;
    membershipFee: kintone.fieldTypes.RadioButton;
    supplierName: kintone.fieldTypes.SingleLineText;
    bankNumber: kintone.fieldTypes.Number;
    branchName: kintone.fieldTypes.SingleLineText;
    ドロップダウン: kintone.fieldTypes.DropDown;
    businessNumber: kintone.fieldTypes.SingleLineText;
    文字列__1行__1: kintone.fieldTypes.SingleLineText;
    membershipFeePar: kintone.fieldTypes.Number;
    online: kintone.fieldTypes.RadioButton;
    managementID: kintone.fieldTypes.SingleLineText;
    depositType: kintone.fieldTypes.DropDown;
    branchCord: kintone.fieldTypes.Number;
    bill: kintone.fieldTypes.Calc;
    チェックボックス_0: kintone.fieldTypes.CheckBox;
    チェックボックス: kintone.fieldTypes.CheckBox;
    memberTable: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          memberTel: kintone.fieldTypes.SingleLineText;
          memberUuid: kintone.fieldTypes.SingleLineText;
          memberName: kintone.fieldTypes.SingleLineText;
          ラジオボタン: kintone.fieldTypes.RadioButton;
          memberMail: kintone.fieldTypes.SingleLineText;
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
    作成日時: kintone.fieldTypes.CreatedTime;
    更新日時: kintone.fieldTypes.UpdatedTime;
  }
}

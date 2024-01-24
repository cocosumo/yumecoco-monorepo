declare namespace DBConferenceContracts {
  interface Data {
    codes: kintone.fieldTypes.SingleLineText;
    contractDate: kintone.fieldTypes.Date;
    cocosumoKoujiId: kintone.fieldTypes.SingleLineText;
    last_profit: kintone.fieldTypes.Number;
    ルックアップ: kintone.fieldTypes.SingleLineText;
    projTypeName: kintone.fieldTypes.SingleLineText;
    yumeAGName: kintone.fieldTypes.SingleLineText;
    最終請負金額: kintone.fieldTypes.Number;
    cocosumoAGId: kintone.fieldTypes.SingleLineText;
    Ccodes: kintone.fieldTypes.SingleLineText;
    年度: kintone.fieldTypes.SingleLineText;
    projectId: kintone.fieldTypes.SingleLineText;
    refund: kintone.fieldTypes.RadioButton;
    yumeAGId: kintone.fieldTypes.SingleLineText;
    紹介料: kintone.fieldTypes.Number;
    cocosumoAGName: kintone.fieldTypes.SingleLineText;
    完工日: kintone.fieldTypes.Date;
    cocosumoKoujiName: kintone.fieldTypes.SingleLineText;
    contractAmountIntax: kintone.fieldTypes.Number;
    storeName: kintone.fieldTypes.SingleLineText;
    profit: kintone.fieldTypes.Number;
    yumeAGId2: kintone.fieldTypes.SingleLineText;
    projName: kintone.fieldTypes.SingleLineText;
    storeId: kintone.fieldTypes.SingleLineText;
    custName: kintone.fieldTypes.SingleLineText;
    工事状況: kintone.fieldTypes.RadioButton;
    projTypeId: kintone.fieldTypes.SingleLineText;
    yumeAGName2: kintone.fieldTypes.SingleLineText;
    territory: kintone.fieldTypes.SingleLineText;
    contractYear: kintone.fieldTypes.Calc;
    last_editProfit: kintone.fieldTypes.Calc;
    最終請負金額_税抜: kintone.fieldTypes.Calc;
    contractAmountNotax: kintone.fieldTypes.Calc;
    editProfit: kintone.fieldTypes.Calc;
    commisionNewHouse: kintone.fieldTypes.Calc;
    last_commission: kintone.fieldTypes.Calc;
    last_commisionNewHouse: kintone.fieldTypes.Calc;
    profitMargin: kintone.fieldTypes.Calc;
    commission: kintone.fieldTypes.Calc;
    last_profitMargin: kintone.fieldTypes.Calc;
    contractMonth: kintone.fieldTypes.Calc;
    抽出箇所: kintone.fieldTypes.CheckBox;
    自社物件: kintone.fieldTypes.CheckBox;
    same_AG: kintone.fieldTypes.CheckBox;
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

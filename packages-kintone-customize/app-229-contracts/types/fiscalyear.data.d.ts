declare namespace DBFYData {
  interface Record {
    personalTotalJudge_east: kintone.fieldTypes.SingleLineText;
    westTotalGoal: kintone.fieldTypes.Number;
    personalTotalJudge_west: kintone.fieldTypes.SingleLineText;
    eastTotalGoal: kintone.fieldTypes.Number;
    fiscalYear: kintone.fieldTypes.Number;
    adTotal: kintone.fieldTypes.Calc;
    eastAnother: kintone.fieldTypes.Calc;
    expensesTotal: kintone.fieldTypes.Calc;
    westAnother: kintone.fieldTypes.Calc;
    monthlyTotalGoal: kintone.fieldTypes.Calc;
    westMonthlyAnother: kintone.fieldTypes.Calc;
    eastMonthlyAnother: kintone.fieldTypes.Calc;
    alltotalGoal: kintone.fieldTypes.Calc;
    westMonthlyTotalGoal: kintone.fieldTypes.Calc;
    eastMonthlyTotalGoal: kintone.fieldTypes.Calc;
    adTable: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          adExpense: kintone.fieldTypes.Number;
          adDetails: kintone.fieldTypes.SingleLineText;
          adMonth: kintone.fieldTypes.DropDown;
        };
      }>;
    };
    meetingEventTable: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          eventDetails: kintone.fieldTypes.SingleLineText;
          eventMonth: kintone.fieldTypes.DropDown;
        };
      }>;
    };
    eastConstractTargetTable: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          eastAnnualGoal: kintone.fieldTypes.Number;
          eastProjTypeName: kintone.fieldTypes.SingleLineText;
          eastProjUuid: kintone.fieldTypes.SingleLineText;
          eastMonthlyGoal: kintone.fieldTypes.Calc;
        };
      }>;
    };
    personalGoalTable_west: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          ルックアップ_0: kintone.fieldTypes.SingleLineText;
          personalGoal_west: kintone.fieldTypes.Number;
          monthlyPersonalGoal_west: kintone.fieldTypes.Calc;
        };
      }>;
    };
    expensesTable: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          otherExpenses: kintone.fieldTypes.Number;
          expensesMonth: kintone.fieldTypes.DropDown;
          expensesDetails: kintone.fieldTypes.SingleLineText;
        };
      }>;
    };
    westConstractTargetTable: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          westProjTypeName: kintone.fieldTypes.SingleLineText;
          westAnnualGoal: kintone.fieldTypes.Number;
          westProjUuid: kintone.fieldTypes.SingleLineText;
          westMonthlyGoal: kintone.fieldTypes.Calc;
        };
      }>;
    };
    personalGoalTable_east: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          personalGoal_east: kintone.fieldTypes.Number;
          ルックアップ: kintone.fieldTypes.SingleLineText;
          monthlyPersonalGoal_east: kintone.fieldTypes.Calc;
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

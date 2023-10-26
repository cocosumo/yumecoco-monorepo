import { ExpensesCell } from './common/ExpensesCell';

export const YearlyOtherExpenseAmt = ({
  amount,
}:{
  amount: number;
}) => {
  
  return (

    <ExpensesCell 
      expenseAmt={amount}
      label='その他経費合計'
    /> 
  );
};
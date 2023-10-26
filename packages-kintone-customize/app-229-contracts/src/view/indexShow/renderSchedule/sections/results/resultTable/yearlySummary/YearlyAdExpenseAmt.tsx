
import { ExpensesCell } from './common/ExpensesCell';

export const YearlyAdExpenseAmt = ({
  amount,
}:{
  amount: number;
}) => {
  return (

    <ExpensesCell 
      expenseAmt={amount}
      label='広告宣伝費合計'
    /> 
  );
};
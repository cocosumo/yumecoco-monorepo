
import { MonthlyCommisionCell } from './common/MonthlyCommisionCell';

export const MonthCommisionActualLastYear = ({
  amt,
}:{
  amt: number
}) => {
  
  return (
    <MonthlyCommisionCell 
      amt={amt}
    />

  );
};
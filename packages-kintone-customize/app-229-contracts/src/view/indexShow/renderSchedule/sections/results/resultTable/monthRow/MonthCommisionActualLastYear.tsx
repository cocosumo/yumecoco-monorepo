
import { MonthlyCommisionCell } from './common/MontlyCommisionCell';

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
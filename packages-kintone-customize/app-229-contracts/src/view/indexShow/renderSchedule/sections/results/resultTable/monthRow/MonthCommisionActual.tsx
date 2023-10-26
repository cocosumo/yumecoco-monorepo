
import { blue } from '@mui/material/colors';
import { MonthlyCommisionCell } from './common/MonthlyCommisionCell';

export const MonthCommisionActual = ({
  amt,
}:{
  amt: number
}) => {
  
  return (
    <MonthlyCommisionCell 
      amt={amt}
      color={blue[600]}
    />
  );
};
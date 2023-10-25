
import { blue } from '@mui/material/colors';
import { MonthlyCommisionCell } from './common/MontlyCommisionCell';

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
import { TableCell } from '@mui/material';
import { Fragment } from 'react';
import { useFiscalYearData } from '../../../hooks/useFiscalYearData';

export const MonthRowTarget = () => {

  const; 
  const { data } = useFiscalYearData(); 

  const {
    
  } = data || {};

  return (
    <Fragment>
      <TableCell>
        目標値
      </TableCell>

      {/* 新築工事 */}
      <TableCell>
        111
      </TableCell>

      {/* 新築付帯工事 */}
      <TableCell>
        222
      </TableCell>

      {/* 太陽光 */}
      <TableCell>
        333
      </TableCell>

      {/* リフォーム工事 */}
      <TableCell>
        444
      </TableCell>

      {/* その他 */}
      <TableCell>
        555
      </TableCell>
    </Fragment>
  );
};
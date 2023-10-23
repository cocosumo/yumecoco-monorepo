import { TableCell } from '@mui/material';
import { roundTo } from 'libs';
import { Fragment } from 'react';
import { YearlyRowHeader } from './YearlyRowHeader';
import { green } from '@mui/material/colors';

export const TotalProfit = ({
  totalProfit,
}:{
  totalProfit: number;
}) => {
  
  return (
    <Fragment>
      <YearlyRowHeader label={'粗利金額合計(Ａ)'} />

      <TableCell 
        colSpan={2}
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 24,
          bgcolor: green[100],
        }}
      >
        {roundTo(totalProfit / 10000).toLocaleString()}
      </TableCell>
      
    </Fragment>
  );
};
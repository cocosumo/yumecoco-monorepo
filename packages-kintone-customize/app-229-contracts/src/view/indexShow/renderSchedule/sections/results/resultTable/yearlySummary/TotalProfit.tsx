import { roundTo } from 'libs';
import { Fragment } from 'react';
import { YearlyRowHeader } from './common/YearlyRowHeader';
import { green } from '@mui/material/colors';
import { TotalCell } from './common/TotalCell';
import { Tooltip } from '@mui/material';

export const TotalProfit = ({
  amt,
}:{
  amt: number;
}) => {
  
  return (
    <Fragment>
      <YearlyRowHeader label={'粗利金額合計'} />

      <Tooltip title={`${amt.toLocaleString()} 円`}>
        
        <TotalCell
          colSpan={2}
          sx={{
            bgcolor: green[200],
          }}
        >
          {roundTo(amt / 10000).toLocaleString()}
        </TotalCell>
      </Tooltip>

    </Fragment>
  );
};
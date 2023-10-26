import { Fragment } from 'react';
import { YearlyRowHeader } from './common/YearlyRowHeader';
import { TotalCell } from './common/TotalCell';
import { blue } from '@mui/material/colors';
import { roundTo } from 'libs';
import { Tooltip } from '@mui/material';

export const TotalOperatingProfit = ({
  amt,
}:{
  amt: number,
}) => {


  return (
    <Fragment>
      <YearlyRowHeader label={'営業利益'} />

      <Tooltip title={`${amt.toLocaleString()} 円`}>
        <TotalCell
          colSpan={2}
          sx={{
            bgcolor: blue[600],
          }}
        >
          {roundTo(  amt / 10000).toLocaleString()}
        </TotalCell>
      </Tooltip>

    
    </Fragment>
  );
};
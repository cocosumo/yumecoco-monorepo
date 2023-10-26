import { Fragment } from 'react';
import { YearlyRowHeader } from './common/YearlyRowHeader';
import { TotalCell } from './common/TotalCell';
import { yellow } from '@mui/material/colors';
import { roundTo } from 'libs';
import { Tooltip } from '@mui/material';

export const TotalExpenses = ({
  amt,
}:{
  amt: number,
}) => {


  return (
    <Fragment>
      <YearlyRowHeader label={'経費金額合計'} />

      <Tooltip title={`${amt.toLocaleString()} 円`}>

        <TotalCell
          colSpan={2}
          sx={{
            bgcolor: yellow.A200,
          }}
        >
          {roundTo(  amt / 10000).toLocaleString()}
        </TotalCell>
      </Tooltip>

    
    </Fragment>
  );
};
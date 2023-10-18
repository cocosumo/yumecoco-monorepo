import { TableCell } from '@mui/material';
import { Fragment } from 'react';
import { projTypesToShow } from '../../../config';
import { roundTo } from 'libs';
import { UseTargetDataReturn } from '../../../hooks/useTargetData';

export const MonthRowTarget = ({
  data,
}:{
  data: UseTargetDataReturn['data'] | null,
}) => {

  const {
    fiscalYearData,
  } = data || {};

  const {
    targets,
    othersMonthlyTarget,
    totalMonthlyTarget,
  } = fiscalYearData || {};

  return (
    <Fragment>
      <TableCell>
        目標値
      </TableCell>
      {projTypesToShow.map(({
        id,
      }) => {
        return (

          <TableCell 
            key={id} align='right'
            sx={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            {roundTo(targets?.[id]?.monthlyTarget ?? 0).toLocaleString()}
          </TableCell>
        );
      })}

      {/* その他 */}
      <TableCell 
        align='right'
        sx={{
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        {roundTo(othersMonthlyTarget ?? 0).toLocaleString()}
      </TableCell>

      {/* 目標合計 */}
      <TableCell 
        align='right'
        sx={{
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        {roundTo(totalMonthlyTarget ?? 0).toLocaleString()}
      </TableCell>
    </Fragment>
  );
};
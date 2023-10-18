import { TableCell, TableRow } from '@mui/material';
import { Fragment } from 'react';
import { MonthHeader } from './MonthHeader';
import { projTypesToShow } from '../../../config';

import { UseTargetDataReturn } from '../../../hooks/useTargetData';
import { MonthRowActual } from './MonthRowActual';
import { MonthRowTarget } from './MonthRowTarget';
import { MonthRowEvents } from './MonthlyEvents';

export const MonthRow = ({
  month,
  fiscalYear,
  data,
}:{
  month: number,
  fiscalYear: number,
  data: UseTargetDataReturn['data'],
}) => {

  const {
    events,
    groupedContracts,
  } = data || {};

  return (
    <Fragment key={month}>
      <TableRow>
        <MonthHeader month={month} />

        <MonthRowEvents eventsByMonth={events?.[month]} />

        <MonthRowTarget data={data} />

        <TableCell rowSpan={3} />
        <TableCell rowSpan={3} />

        <TableCell>
          -
        </TableCell>
 
        <TableCell rowSpan={3} />


      </TableRow>

      <TableRow >
        <TableCell>
          昨年実績値
        </TableCell>
        {projTypesToShow.map(({
          id,
        }) => {
          return (
            <TableCell 
              sx={{
                fontSize: 18,
                fontWeight: 'bold',
              }}
              key={id} align='right'
            >
              0
            </TableCell>
          );
        })}

        <TableCell 
          align='right'
          sx={{
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          0
        </TableCell>

        <TableCell>
          -
        </TableCell>
 
      </TableRow>

      <MonthRowActual groupedContractsByProjId={groupedContracts?.[fiscalYear]?.monthlyData[month]} />

    </Fragment>
  );
};
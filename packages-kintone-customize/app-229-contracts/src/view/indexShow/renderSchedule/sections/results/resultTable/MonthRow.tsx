import { TableCell, TableRow } from '@mui/material';
import { Fragment } from 'react';
import { MonthHeader } from './MonthHeader';

import { UseTargetDataReturn } from '../../../hooks/useTargetData';
import { MonthRowActual } from './MonthRowActual';
import { MonthRowTarget } from './MonthRowTarget';
import { MonthRowEvents } from './MonthlyEvents';
import { MonthRowActualLastYear } from './MonthRowActualLastYear';

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

      <MonthRowActualLastYear 
        groupedContractsByProjId={groupedContracts?.[fiscalYear - 1]?.monthlyData[month]}
      />

      <MonthRowActual 
        groupedContractsByProjId={groupedContracts?.[fiscalYear]?.monthlyData[month]}
      />

    </Fragment>
  );
};
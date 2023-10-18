import { TableCell, TableRow } from '@mui/material';
import { Fragment } from 'react';
import { MonthHeader } from '../MonthHeader';

import { UseTargetDataReturn } from '../../../../hooks/useTargetData';
import { MonthRowActual } from './MonthRowActual';
import { MonthRowTarget } from './MonthRowTarget';
import { MonthRowEvents } from './MonthlyEvents';
import { MonthRowActualLastYear } from './MonthRowActualLastYear';
import { grey } from '@mui/material/colors';

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
    fiscalYearData,
    contractsData,
  } = data || {};

  console.log('contractsData', contractsData);

  const {
    events,
  } = fiscalYearData || {};

  return (
    <Fragment key={month}>
      <TableRow>
        <MonthHeader month={month} />

        <MonthRowEvents eventsByMonth={events?.[month]} />

        <MonthRowTarget data={data} />

        <TableCell rowSpan={3} />
        <TableCell rowSpan={3} />

        <TableCell 
          sx={{
            bgcolor: grey[200],
          }} 
        />

        <TableCell rowSpan={3} />


      </TableRow>

      <MonthRowActualLastYear 
        contractsData={contractsData?.[fiscalYear - 1]?.monthlyData[month]}
      />

      <MonthRowActual 
        contractsData={contractsData?.[fiscalYear]?.monthlyData[month]}
      />

    </Fragment>
  );
};
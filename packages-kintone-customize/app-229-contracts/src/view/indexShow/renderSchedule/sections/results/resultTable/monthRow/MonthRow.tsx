import { TableCell, TableRow } from '@mui/material';
import { Fragment } from 'react';
import { MonthHeader } from '../MonthHeader';

import { UseTargetDataReturn } from '../../../../hooks/useTargetData';
import { MonthRowActual } from './MonthRowActual';
import { MonthRowTarget } from './MonthRowTarget';
import { MonthRowEvents } from './MonthlyEvents';
import { MonthRowActualLastYear } from './MonthRowActualLastYear';
import { grey } from '@mui/material/colors';
import { MonthlyAds } from './MonthlyAds';
import { MonthlyOtherExpenses } from './MonthlyOtherExpenses';

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

  const {
    events,
  } = fiscalYearData || {};

  return (
    <Fragment key={month}>
      <TableRow>
        <MonthHeader month={month} />

        <MonthRowEvents eventsByMonth={events?.[month]} />

        <MonthRowTarget data={data} />

        <MonthlyAds 
          data={fiscalYearData.ads?.[month]}
        />

        <MonthlyOtherExpenses 
          data={fiscalYearData.otherExpenses?.[month]}
        />


        <TableCell 
          sx={{
            bgcolor: grey[200],
          }} 
        />

      </TableRow>

      <TableRow>
        <MonthRowActualLastYear 
          contractsData={contractsData?.[fiscalYear - 1]?.monthlyData[month]}
        />
        <TableCell>
          -
        </TableCell>

      </TableRow>

      <TableRow>

        <MonthRowActual 
          contractsData={contractsData?.[fiscalYear]?.monthlyData[month]}
        />
        <TableCell>
          -
        </TableCell>
      </TableRow>

    </Fragment>
  );
};
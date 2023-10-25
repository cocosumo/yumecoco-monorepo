import { TableCell, TableRow } from '@mui/material';
import { Fragment } from 'react';
import { MonthHeader } from '../MonthHeader';

import { UseTargetDataReturn } from '../../../../hooks/useTargetData';
import { MonthRowActual } from './MonthRowActual';
import { MonthRowTarget } from './MonthRowTarget';
import { MonthRowEvents } from './MonthEvents';
import { MonthRowActualLastYear } from './MonthRowActualLastYear';
import { grey } from '@mui/material/colors';
import { MonthAds } from './MonthAds';
import { MonthOtherExpenses } from './MonthOtherExpenses';
import { MonthCommisionActual } from './MonthCommisionActual';
import { MonthCommisionActualLastYear } from './MonthCommisionActualLastYear';

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

        <MonthAds 
          data={fiscalYearData.ads?.[month]}
        />

        <MonthOtherExpenses 
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

        <MonthCommisionActualLastYear 
          amt={contractsData?.[fiscalYear - 1]?.monthlyData?.[month]?.totalCommission || 0}
        />

      </TableRow>

      <TableRow>

        <MonthRowActual 
          contractsData={contractsData?.[fiscalYear]?.monthlyData[month]}
        />
        <MonthCommisionActual 
          amt={contractsData?.[fiscalYear]?.monthlyData?.[month]?.totalCommission || 0}
        />


      </TableRow>

    </Fragment>
  );
};
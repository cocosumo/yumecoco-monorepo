import { UseTargetDataReturn } from '../../../../hooks/useTargetData';
import { TableRow } from '@mui/material';
import { YearlyTarget } from './YearlyTarget';
import { Fragment } from 'react';
import { YearActualPerformance } from './YearActualPerformance';
import { red } from '@mui/material/colors';
import { YearlyTargetDifference } from './YearlyTargetDifference';
import { TotalProfit } from './TotalProfit';
import { YearlyAdExpenseAmt } from './YearlyAdExpenseAmt';
import { YearlyOtherExpenseAmt } from './YearlyOtherExpense';

export const YearlySummary = ({
  fiscalYear,
  data,
}:{
  fiscalYear: number,
  data: UseTargetDataReturn['data'],
}) => {
  
  return (
    <Fragment>
      <TableRow>
        <YearlyTarget data={data} />
        <YearlyAdExpenseAmt 
          amount={data.fiscalYearData?.totalAdExpenses || 0}
        />
        <YearlyOtherExpenseAmt 
          amount={data.fiscalYearData?.totalOtherExpenses || 0}
        />
      </TableRow>
      <TableRow>
        <YearActualPerformance 
          label='昨年度売上実績	'
          data={data.contractsData?.[fiscalYear - 1]}
        />
      </TableRow>
      <TableRow>
        <YearActualPerformance 
          label='売上額'
          color={red[600]}
          data={data.contractsData?.[fiscalYear]}
        />
      </TableRow>
      <TableRow>
        <YearlyTargetDifference 
          data={data}
          year={fiscalYear}
        />
      </TableRow>
      <TableRow>
        <TotalProfit 
          totalProfit={data.contractsData?.[fiscalYear]?.totalProfit || 0}
        />
      </TableRow>
    </Fragment>


  );
}; 
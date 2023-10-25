import { UseTargetDataReturn } from '../../../../hooks/useTargetData';
import { TableRow } from '@mui/material';
import { YearlyTarget } from './YearlyTarget';
import { Fragment } from 'react';
import { YearlyActualPerformance } from './YearlyActualPerformance';
import { red } from '@mui/material/colors';
import { YearlyTargetDifference } from './YearlyTargetDifference';
import { TotalProfit } from './TotalProfit';
import { YearlyAdExpenseAmt } from './YearlyAdExpenseAmt';
import { YearlyOtherExpenseAmt } from './YearlyOtherExpense';
import { IgnoredCell } from './common/IgnoredCell';
import { OffsetCells } from './common/OffsetCells';

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
        <IgnoredCell />
      </TableRow>
      <TableRow>
        <YearlyActualPerformance 
          label='昨年度売上実績	'
          data={data.contractsData?.[fiscalYear - 1]}
        />
        <OffsetCells offset={2} />
      </TableRow>
      <TableRow>
        <YearlyActualPerformance 
          label='売上額'
          color={red[600]}
          data={data.contractsData?.[fiscalYear]}
        />
        <OffsetCells offset={2} />
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
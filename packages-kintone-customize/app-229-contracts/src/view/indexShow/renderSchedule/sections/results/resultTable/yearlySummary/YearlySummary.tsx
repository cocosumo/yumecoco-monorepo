import { UseTargetDataReturn } from '../../../../hooks/useTargetData';
import { TableRow } from '@mui/material';
import { YearlyTarget } from './YearlyTarget';
import { Fragment } from 'react';
import { YearlyActualPerformance } from './YearlyActualPerformance';
import { red, yellow } from '@mui/material/colors';
import { YearlyTargetDifference } from './YearlyTargetDifference';
import { TotalProfit } from './TotalProfit';
import { YearlyAdExpenseAmt } from './YearlyAdExpenseAmt';
import { YearlyOtherExpenseAmt } from './YearlyOtherExpense';
import { IgnoredCell } from '../common/IgnoredCell';
import { BorderlessCell } from './common/BorderlessCell';
import { YearlyCommision } from './YearlyCommision';
import { TotalExpenses } from './TotalExpenses';
import { TotalOperatingProfit } from './TotalOperatingProfit';

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
        <BorderlessCell />
        <YearlyCommision
          label='昨年度合計'
          amount={data.contractsData?.[fiscalYear - 1]?.totalCommission || 0}
        />

      </TableRow>
      <TableRow>
        <YearlyActualPerformance 
          label='売上額'
          color={red[600]}
          data={data.contractsData?.[fiscalYear]}
        />
        <BorderlessCell />
        <YearlyCommision
          label='今年度合計'
          amount={data.contractsData?.[fiscalYear]?.totalCommission || 0}
          bgColor={yellow.A200}
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
          amt={data.contractsData?.[fiscalYear]?.totalProfit || 0}
        />
      </TableRow>
      <TableRow>
        <TotalExpenses
          amt={data.totalExpenseAmt}
        />
      </TableRow>
      <TableRow>
        <TotalOperatingProfit
          amt={data.totalOperatingProfit}
        />
      </TableRow>
    </Fragment>


  );
}; 
import { LinearProgress, Table, TableBody, TableHead } from '@mui/material';
import styles from './FiscalYearResult.module.css';
import { TableRowLayout } from './TableRowLayout';
import { useContractsByFiscalYear } from './useContractsByFiscalYear';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import { calcProfitRate, roundTo } from 'libs';

export const FiscalYearResult = () => {
  const { 
    data,
    fiscalMonths,
    isLoading,
  } = useContractsByFiscalYear();

  if (isLoading) {
    return <LinearProgress />;
  }

  console.log(fiscalMonths);

  return (
    <Table className={styles.table}>
      <TableHead>
        <TableRowLayout
          month='月度'
          count='件数'
          contractAmountIncTax='契約金額  (税込)'
          contractAmountExclTax='契約金額  (税抜き)'
          grossProfit='粗利'
          grossProfitRate='粗利率'

        />
      </TableHead>
      <TableBody>
        {fiscalMonths.map((month) => {

          const {
            totalAmountExclTax = 0,
            totalAmountInclTax = 0,
            totalProfit = 0,
            contracts,
          } = data?.[month] || {};

          console.log(totalAmountExclTax, totalProfit);
          return (
            <TableRowLayout
              key={month}
              month={`${format(parse(month, 'yyyy-MM', new Date()), 'M')}月度`}
              count={contracts?.length || 0}
              contractAmountIncTax={roundTo(totalAmountInclTax).toLocaleString() || '0'}
              contractAmountExclTax={roundTo(totalAmountExclTax).toLocaleString() || '0'}
              grossProfit={roundTo(totalProfit).toLocaleString() || '0'}
              grossProfitRate={roundTo(calcProfitRate(totalAmountExclTax - totalProfit, totalAmountExclTax) * 100, 2)}
            />
          );
        })}
       

      </TableBody>
    </Table>
  );

};
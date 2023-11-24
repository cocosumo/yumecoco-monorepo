import { Table, TableBody, TableFooter, TableHead, Typography } from '@mui/material';
import styles from './FiscalYearResult.module.css';
import { TableRowLayout } from './TableRowLayout';
import { UseContractsByFiscalYearReturn } from '../../../hooks/useContractsByFiscalYear';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import { calcProfitRate, roundTo } from 'libs';
import { Stack } from '@mui/system';
import { useTypedWatch } from '../../../hooks/useTypedRHF';
import { useStoreNameById } from '../../../hooks/useStoreNameById';

export const FiscalYearResult = ({
  fiscalYearQuery,
  hasTitle,
  label,
}:{
  fiscalYearQuery: UseContractsByFiscalYearReturn
  hasTitle?: boolean
  label?: string
}) => {

  const [
    year,
    stores,
  ] = useTypedWatch({
    name: [
      'year',
      'stores',
    ],
  }) as [string, string];

  let storeName = useStoreNameById(stores);

  if (stores === '自社物件') {
    storeName = '自社物件';
  }
  

  const { 
    data,
    fiscalMonths,
  } = fiscalYearQuery;

  const {
    totalCount,
    totalAmountInclTax = 0,
    totalAmountExclTax = 0,
    totalProfit = 0,
  } = data || {};

  const tableLabel = label ||  `${year}年度 ${storeName ? storeName : '全店舗'}	契約累積表`;
  

  return (
    <Stack spacing={1}>
      {hasTitle && (
      <Typography variant='h5'>
        {tableLabel}
      </Typography>
      )}
    

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
              totalAmountInclTax: _totalAmountInclTax = 0,
              totalAmountExclTax: _totalAmountExclTax = 0,
              totalProfit: _totalProfit = 0,
              contracts,
            } = data?.details?.[month] || {};
            return (
              <TableRowLayout
                key={month}
                month={`${format(parse(month, 'yyyy-MM', new Date()), 'M')}月度`}
                count={contracts?.length || 0}
                contractAmountIncTax={roundTo(_totalAmountInclTax).toLocaleString() || '0'}
                contractAmountExclTax={roundTo(_totalAmountExclTax).toLocaleString() || '0'}
                grossProfit={roundTo(_totalProfit).toLocaleString() || '0'}
                grossProfitRate={roundTo(calcProfitRate(_totalAmountExclTax - _totalProfit, _totalAmountExclTax) * 100, 2)}
              />
            );
          })}
       

        </TableBody>
        <TableFooter>
          <TableRowLayout
            month='合計'
            count={totalCount || 0}
            contractAmountIncTax={roundTo(totalAmountInclTax).toLocaleString() || '0'}
            contractAmountExclTax={roundTo(totalAmountExclTax).toLocaleString() || '0'}
            grossProfit={roundTo(totalProfit).toLocaleString() || '0'}
            grossProfitRate={roundTo(calcProfitRate(totalAmountExclTax - totalProfit, totalAmountExclTax) * 100, 2)}
          />
        </TableFooter>
      </Table>
    </Stack>
  );

};
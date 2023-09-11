import { TableCell, TableRow } from '@mui/material';
import { ReactNode } from 'react';

export interface TableRowLayoutProps {
  month: ReactNode,
  count: ReactNode,
  contractAmountIncTax: ReactNode,
  contractAmountExclTax: ReactNode,
  grossProfit: ReactNode,
  grossProfitRate: ReactNode,
}





export const TableRowLayout = (props: TableRowLayoutProps) => {
  const {
    month,
    count,
    contractAmountIncTax,
    contractAmountExclTax,
    grossProfit,
    grossProfitRate,
  } = props;


  return (
    <TableRow>
      <TableCell align='center'>
        {month}
      </TableCell>
      <TableCell align='right'>
        {count}
      </TableCell>
      <TableCell align='right'>
        {contractAmountIncTax}
      </TableCell>
      <TableCell align='right'>
        {contractAmountExclTax}
      </TableCell>
      <TableCell align='right'>
        {grossProfit}
      </TableCell>
      <TableCell align='right'>
        {grossProfitRate}
      </TableCell>
    </TableRow>
  );
};
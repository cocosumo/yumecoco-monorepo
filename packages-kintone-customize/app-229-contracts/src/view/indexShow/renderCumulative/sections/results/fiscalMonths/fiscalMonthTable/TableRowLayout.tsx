import { TableCell, TableRow, Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface TableRowLayoutProps {
  rowNum?: ReactNode,
  projType: ReactNode,
  custName: ReactNode,
  projName: ReactNode,
  contractDate: ReactNode,
  contractAmtInclTax: ReactNode,
  contractAmtExclTax: ReactNode,
  grossProfit: ReactNode,
  grossProfitRate: ReactNode,
  agent: ReactNode,
}

export const TableRowLayout = (props: TableRowLayoutProps) => {
  const {
    rowNum,
    projType,
    custName,
    projName,
    contractDate,
    contractAmtInclTax,
    contractAmtExclTax,
    grossProfit,
    grossProfitRate,
    agent,
  } = props;


  return (
    <TableRow>
      <TableCell align='center'>
        <Typography component={'span'}>
          {rowNum}
        </Typography>
        {projType}
      </TableCell>
      <TableCell>
        {custName}
      </TableCell>
      <TableCell>
        {projName}
      </TableCell>
      <TableCell>
        {contractDate}
      </TableCell>
      <TableCell align='right'>
        {contractAmtInclTax}
      </TableCell>
      <TableCell align='right'>
        {contractAmtExclTax}
      </TableCell>
      <TableCell align='right'>
        {grossProfit}
      </TableCell>
      <TableCell align='right'>
        {grossProfitRate}
      </TableCell>
      <TableCell>
        {agent}
      </TableCell>
    </TableRow>
  );
};
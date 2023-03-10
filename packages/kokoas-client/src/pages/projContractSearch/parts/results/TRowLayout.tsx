import { TableCell, TableRow, TableRowProps } from '@mui/material';
import { ReactNode } from 'react';

export const TRowLayout = ({
  contractStatus,
  projDataId,
  estNum,
  projName,
  store,
  yumeAG,
  cocoAG,
  custName,
  contractDate,
  contractAmount,
  grossProfit,
  profitRate,
  latestInvoiceDate,
  latestInvoiceAmount,
  plannedPaymentDate,

  menu,
  tableRowProps,
}: {
  contractStatus: ReactNode,
  projDataId: ReactNode,
  estNum: ReactNode,
  projName: ReactNode,
  store: ReactNode,
  yumeAG: ReactNode,
  cocoAG: ReactNode,
  custName: ReactNode,
  contractDate: ReactNode,
  contractAmount: ReactNode,
  grossProfit: ReactNode,
  profitRate: ReactNode,

  latestInvoiceDate: ReactNode,
  latestInvoiceAmount: ReactNode,
  plannedPaymentDate: ReactNode,
  menu?: ReactNode,
  tableRowProps?: TableRowProps
}) => {
  return (
    <TableRow {...tableRowProps}>
      <TableCell >
        {contractStatus}
        <br />
        {projDataId}
        <br />
        {estNum}
      </TableCell>
      <TableCell>
        {projName}
        <br />
        {custName}
        <br />
        {contractDate}
      </TableCell>
      <TableCell>
        {store}
        <br />
        {yumeAG}
        <br />
        {cocoAG}
      </TableCell>
      <TableCell>
        {latestInvoiceAmount}
        <br />
        {latestInvoiceDate}
        <br />
        {plannedPaymentDate}
      </TableCell>
      <TableCell align='right'>
        {contractAmount}
        <br />
        {grossProfit}
        <br />
        {profitRate}
      </TableCell>
      <TableCell>
        {menu}
      </TableCell>
    </TableRow>
  );
};
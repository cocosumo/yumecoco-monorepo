import { Box, TableCell, TableRow, TableRowProps } from '@mui/material';
import { ReactNode } from 'react';

export const TRowLayout = ({
  contractStatus,
  projDataId,
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
        <Box pb={1}>
          {contractStatus}
        </Box>
        <Box pb={1}>
          {projDataId}
        </Box>
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
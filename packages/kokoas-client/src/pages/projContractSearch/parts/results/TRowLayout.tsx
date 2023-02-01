import { TableCell, TableRow, TableRowProps } from '@mui/material';
import { ReactNode } from 'react';

export const TRowLayout = ({
  projId,
  estNum,
  projName,
  store,
  yumeAG,
  cocoAG,
  custName,
  contractDate,
  contractAmount,
  grossProfit,
  menu,
  tableRowProps,
}: {
  projId: ReactNode,
  estNum: ReactNode,
  projName: ReactNode,
  store: ReactNode,
  yumeAG: ReactNode,
  cocoAG: ReactNode,
  custName: ReactNode,
  contractDate: ReactNode,
  contractAmount: ReactNode,
  grossProfit: ReactNode,
  menu?: ReactNode,
  tableRowProps?: TableRowProps
}) => {
  return (
    <TableRow {...tableRowProps}>
      <TableCell align='center'>
        {projId}
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
        {'請求情報'}
        <br />
        {'請求情報'}
      </TableCell>
      <TableCell align='right'>
        {contractAmount}
        <br />
        {grossProfit}
      </TableCell>
      <TableCell>
        {menu}
      </TableCell>
    </TableRow>
  );
};
import { TableCell, TableRow, TableRowProps } from '@mui/material';
import { ReactNode } from 'react';

export const TRowLayout = ({
  projId,
  projEstimateId,
  projName,
  projType,
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
  projEstimateId: ReactNode,
  projName: ReactNode,
  projType: ReactNode,
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
      <TableCell>
        {projId}
        <br />
        {projEstimateId}
      </TableCell>
      <TableCell>
        {projName}
        <br />
        {projType}
      </TableCell>
      <TableCell>
        {store}
        <br />
        {yumeAG}
        <br />
        {cocoAG}
      </TableCell>
      <TableCell>
        {custName}
        <br />
        {contractDate}
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
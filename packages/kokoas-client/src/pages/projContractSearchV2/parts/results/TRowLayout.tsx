import { Box, Stack, TableCell, TableRow } from '@mui/material';
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
  createdAt,
  updatedAt,
  signMethod,
  onClick,
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
  createdAt?: ReactNode,
  updatedAt?: ReactNode,
  signMethod?: ReactNode,
  onClick?: () => void,
}) => {
  return (
    <TableRow 
      onClick={onClick}
    >
      <TableCell >
        <Stack spacing={1}>
          <span>
            {contractStatus}
          </span>
          <span>
            {projDataId}
          </span>
        </Stack>

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
      
      <TableCell align='right'>
        {contractAmount}
        <br />
        {grossProfit}
        <br />
        {profitRate}
      </TableCell>
      <TableCell>
        {createdAt}
        <br />
        {updatedAt}
      </TableCell>
    </TableRow>
  );
};
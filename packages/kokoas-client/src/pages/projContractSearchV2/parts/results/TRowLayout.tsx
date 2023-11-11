import { TableCell, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';

export const TRowLayout = ({
  contractStatus,
  projDataId,
  projName,
  store,
  yumeAG,
  cocoAG,
  cocoConst,
  custName,
  contractDate,
  contractAmount,
  grossProfit,
  profitRate,
  createdAt,
  updatedAt,
  signMethod,
  category,
  refundAmt,
  reductionAmt,
  subsidyAmt,
  onClick,
}: {
  contractStatus: ReactNode,
  projDataId: ReactNode,
  projName: ReactNode,
  store: ReactNode,
  yumeAG: ReactNode,
  cocoAG: ReactNode,
  cocoConst: ReactNode,
  custName: ReactNode,
  contractDate: ReactNode,
  contractAmount: ReactNode,
  grossProfit: ReactNode,
  profitRate: ReactNode,
  createdAt?: ReactNode,
  updatedAt?: ReactNode,
  signMethod?: ReactNode,
  category?: ReactNode,
  refundAmt?: ReactNode,
  reductionAmt?: ReactNode,
  subsidyAmt?: ReactNode,
  onClick?: () => void,
}) => {
  return (
    <TableRow 
      onClick={onClick}
    >
      <TableCell 
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
   
        {contractStatus}
        <br />
        {projDataId}
        <br />
        {category}
        {' '}
        (
        {signMethod}
        )
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
        <br />
        {cocoConst}
      </TableCell>
      
      <TableCell 
        align='right'
        sx={{
          whiteSpace: 'nowrap',
          textAlign: 'right',
        }}
      >
        {contractAmount}
        <br />
        {grossProfit}
        <br />
        {profitRate}
      </TableCell>
      <TableCell
        align='right'
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {refundAmt}
        <br />
        {reductionAmt}
        <br />
        {subsidyAmt}
      </TableCell>
      <TableCell
        sx={{
          whiteSpace: 'nowrap',
          color: grey[600],
          fontSize: '0.75rem',
        }}
      >
        {createdAt}
        <br />
        {updatedAt}
      </TableCell>

    </TableRow>
  );
};
import { TableCell, TableRow } from '@mui/material';
import { ReactNode } from 'react';

export interface RowLayoutProps {
  index: ReactNode,
  custName: ReactNode,
  projName: ReactNode,
  contractDate: ReactNode,
  contractAmt: ReactNode,
  agentNames: ReactNode, // ゆめてつAG

}

export const ByStoreTRLayout = ({
  index,
  custName,
  projName,
  contractDate,
  contractAmt,
  agentNames,
}: RowLayoutProps) => {

  return (
    <TableRow>
      <TableCell>
        {index}
      </TableCell>
      <TableCell>
        {custName}
      </TableCell>
      <TableCell>
        {projName}
      </TableCell>
      <TableCell align='center'>
        {contractDate}
      </TableCell>
      <TableCell align='right'>
        {contractAmt}
      </TableCell>
      <TableCell>
        {agentNames}
      </TableCell>
    </TableRow>


  );

};
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
      <TableCell 
        sx={{ width: '10px' }}
      >
        {index}
      </TableCell>
      <TableCell
        sx={{ width: '50px' }}
      >
        {custName}
      </TableCell>
      <TableCell 
        sx={{ width: '100px' }}
      >
        {projName}
      </TableCell>
      <TableCell 
        sx={{ width: '25px' }} 
        align='center'
      >
        {contractDate}
      </TableCell>
      <TableCell 
        sx={{ width: '25px' }} 
        align='right'
      >
        {contractAmt}
      </TableCell>
      <TableCell 
        sx={{ width: '20px' }}
      >
        {agentNames}
      </TableCell>
    </TableRow>


  );

};
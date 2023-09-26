import { TableCell, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';
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
        align='center'
        sx={{ 
          width: '10px', 
          fontSize: 10,
        }}
      >
        {index}
      </TableCell>
      <TableCell
        sx={{ width: '60px' }}
      >
        {custName}
      </TableCell>
      <TableCell 
        sx={{ width: '120px' }}
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
        sx={{ width: '30px' }}
      >
        {agentNames}
      </TableCell>
    </TableRow>


  );

};
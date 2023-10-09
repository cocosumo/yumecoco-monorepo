import { TableCell, TableRow } from '@mui/material';
import { getRecordPath } from 'api-kintone';
import { ReactNode } from 'react';
import { appId } from '../../../../../../../constants';

export interface RowLayoutProps {
  index: ReactNode,
  custName: ReactNode,
  projName: ReactNode,
  contractDate: ReactNode,
  contractAmt: ReactNode,
  agentNames: ReactNode, // ゆめてつAG
  recId?: string,
}

export const ByStoreTRLayout = ({
  index,
  custName,
  projName,
  contractDate,
  contractAmt,
  agentNames,
  recId,
}: RowLayoutProps) => {

  const handleClickRow = () => {
    if (recId) {
      const path = getRecordPath({
        recordId: recId,
        appId: String(appId),
      });

      window.open(path, '_blank');
    }
  };

  return (
    <TableRow onClick={handleClickRow}>
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
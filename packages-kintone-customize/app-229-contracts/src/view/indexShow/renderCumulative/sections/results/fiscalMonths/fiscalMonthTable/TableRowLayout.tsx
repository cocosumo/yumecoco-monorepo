import { TableCell, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';
import { getRecordPath } from 'api-kintone';
import { ReactNode } from 'react';
import { appId } from '../../../../../../../constants';

export interface TableRowLayoutProps {
  rowNum?: ReactNode,
  projType: ReactNode,
  custName: ReactNode,
  projName: ReactNode,
  contractDate: ReactNode,
  contractAmtInclTax: ReactNode,
  contractAmtExclTax: ReactNode,
  grossProfit: ReactNode,
  grossProfitRate: ReactNode,
  agent: ReactNode,
  recId?: string,
}

export const TableRowLayout = (props: TableRowLayoutProps) => {
  const {
    rowNum,
    projType,
    custName,
    projName,
    contractDate,
    contractAmtInclTax,
    contractAmtExclTax,
    grossProfit,
    grossProfitRate,
    agent,
    recId,
  } = props;

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
        sx={{
          color: grey[500],
          fontSize: '0.8rem',
          width: '15pt',
        }}
      >
        {rowNum}
      </TableCell>
      <TableCell 
        align='left'
        width={80}
      >
        {projType}
      </TableCell>
      <TableCell width={'200pt'}>
        {custName}
      </TableCell>
      <TableCell width={'200pt'}>
        {projName}
      </TableCell>
      <TableCell width={80}>
        {contractDate}
      </TableCell>
      <TableCell width={120} align='right'>
        {contractAmtInclTax}
      </TableCell>
      <TableCell width={120} align='right'>
        {contractAmtExclTax}
      </TableCell>
      <TableCell width={80} align='right'>
        {grossProfit}
      </TableCell>
      <TableCell width={50} align='right'>
        {grossProfitRate}
      </TableCell>
      <TableCell width={'100pt'}>
        {agent}
      </TableCell>
    </TableRow>
  );
};
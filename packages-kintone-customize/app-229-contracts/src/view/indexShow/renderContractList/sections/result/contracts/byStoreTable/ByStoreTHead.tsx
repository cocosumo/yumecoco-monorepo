import { TableCell, TableHead, TableRow } from '@mui/material';
import { ByStoreTRLayout } from './ByStoreTRLayout';

export const ByStoreTHead = ({
  tableTitle,
}:{
  tableTitle: string,
}) => {
  
  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: 'rgba(224, 224, 224, 1)',
        }}
      >
        <TableCell align='center' colSpan={6}>
          {tableTitle}
        </TableCell>
      </TableRow>
  
      <ByStoreTRLayout 
        index='件数'
        custName='発注者'
        projName='工事名'
        contractDate='契約日'
        contractAmt='契約金額'
        agentNames='エージェント'
      />
    </TableHead>
  );
};
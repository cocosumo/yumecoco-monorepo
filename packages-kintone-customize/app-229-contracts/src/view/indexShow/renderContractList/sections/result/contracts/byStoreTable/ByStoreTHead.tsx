import { TableHead } from '@mui/material';
import { ByStoreTRLayout } from './ByStoreTRLayout';

export const ByStoreTHead = () => {
  
  return (
    <TableHead >

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
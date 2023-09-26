import { TableHead } from '@mui/material';
import { ByStoreTRLayout } from './ByStoreTRLayout';

export const ByStoreTHead = ({
  isCompanyProperty = false,
}:{
  isCompanyProperty?: boolean,
}) => {
  
  return (
    <TableHead >

      <ByStoreTRLayout 
        index='件数'
        custName={isCompanyProperty ? '店舗名' : '発注者'}
        projName='工事名'
        contractDate='契約日'
        contractAmt='契約金額'
        agentNames={isCompanyProperty ? 'ここすも担当' : 'エージェント'}
      />
    </TableHead>
  );
};
import { TableHead } from '@mui/material';
import { RowLayout } from './RowLayout';

export const ResultHead = () => {
  return (
    <TableHead>
      <RowLayout 
        custName={'顧客名'}
        custNameKana={'顧客名（カナ）'}
        custAddress={'発注者住所'} // 反映しませんが、変わるような予感がするので、とりあえず、残す
        projName={'工事名'}
        tel={'代表TEL'}
        storeName={'店舗名'}
        contractDate={'契約日'}
        projCompletedDate={'完工日'}
      />
    </TableHead>
  );
};
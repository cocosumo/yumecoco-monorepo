import { TableHead } from '@mui/material';
import { RowLayout } from './RowLayout';

export const EstTableHead = () => {
  return (
    <TableHead>
      <RowLayout 
        majorItem={'大項目'}
        middleItem={'中項目'}
        material={'部材'}
        materialRemarks={'部材備考'}
        costPrice={'原価'}
        quantity={'数量'}
        unit={'単位'}
        profitRate={'利益率'}
        unitPrice={'単価'}
        amountAfterTax={'税込金額'}
        remarks={'備考'}
      />

    </TableHead>
  );
};
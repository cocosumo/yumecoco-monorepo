import { TableCell, TableHead, TableRow } from '@mui/material';

export const BillingEntryTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell width={'15%'}>
          {'工事種別'}
        </TableCell>
        <TableCell width={'10%'} align="right">
          {'枝番'}
        </TableCell>
        <TableCell colSpan={2} width={'15%'} align="right">
          {'支払い種別'}
        </TableCell>
        <TableCell align="right">
          {'請求金額'}
        </TableCell>
        <TableCell>
          {/* 追削メニューエリア */}
        </TableCell>
        <TableCell>
          {/* warning表示用エリア */}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
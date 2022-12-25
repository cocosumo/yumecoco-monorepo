import { TableCell, TableHead, TableRow } from '@mui/material';

export const BillingEntryTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell width={'25%'}>
          {'工事種別'}
        </TableCell>
        <TableCell align="right">
          {'枝番'}
        </TableCell>
        <TableCell align="right">
          {'支払い種別'}
        </TableCell>
        <TableCell align="right">
          {'請求金額'}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
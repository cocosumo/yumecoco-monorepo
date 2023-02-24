import { TableCell, TableHead, TableRow } from '@mui/material';

export const EstimateTableHead = ({
  projTypeName,
}: {
  projTypeName: string
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell width={'25%'}>
          {projTypeName}
        </TableCell>
        <TableCell align="right">
          {'枝番'}
        </TableCell>
        <TableCell align="right">
          {'契約金額'}
        </TableCell>
        <TableCell align="right">
          {'請求済み金額'}
        </TableCell>
        <TableCell align="right">
          {'作成済み金額'}
        </TableCell>
        <TableCell>
          {'請求に使用する'}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
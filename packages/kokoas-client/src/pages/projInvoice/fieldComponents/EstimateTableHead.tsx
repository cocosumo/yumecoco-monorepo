import { TableCell, TableHead, TableRow } from '@mui/material';
import { CreatedAmountToolTip } from './CreatedAmountToolTip';

export const EstimateTableHead = ({
  projTypeName,
}: {
  projTypeName: string
}) => {
  return (
    <TableHead>
      <TableRow>

        <TableCell width={'15%'}>
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
          <CreatedAmountToolTip infoToolTip='請求書を発行済みの請求金額の総額' />
        </TableCell>

        <TableCell align="right">
          {'作成済み金額'}
          <CreatedAmountToolTip infoToolTip='作成した請求金額の総額(請求済みも含む)' />
        </TableCell>

        <TableCell>
          {'請求に使用する'}
        </TableCell>

      </TableRow>
    </TableHead>
  );
};
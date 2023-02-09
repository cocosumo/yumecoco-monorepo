import { TableCell, TableRow } from '@mui/material';
import { TMaterials } from '../form';

export const BillingTotalBody = ({
  estimates,
}: {
  estimates: TMaterials[]
}) => {

  const billingTotal = estimates.reduce((acc, cur) => {
    if (cur.isForPayment !== true) return acc;

    return acc + cur.billingAmount;
  }, 0);

  /* 税抜金額の算出処理を移管する */

  return (
    <TableRow>
      <TableCell>
        {'請求合計'}
      </TableCell>
      <TableCell align="right">
        {'未実装'}
      </TableCell>
      <TableCell align="right">
        {billingTotal.toLocaleString()}
      </TableCell>
    </TableRow>
  );
};
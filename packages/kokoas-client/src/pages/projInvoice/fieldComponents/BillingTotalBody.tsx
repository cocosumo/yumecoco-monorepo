import { TableCell, TableRow } from '@mui/material';
import { TMaterials } from '../form';
import { Big } from 'big.js';
import { calculateAmountBeforeTax } from 'api-kintone';

/** 税額　※当面は10%で固定とする */
const taxRate = 0.1;

export const BillingTotalBody = ({
  estimates,
}: {
  estimates: TMaterials[]
}) => {

  const result = estimates.reduce(
    (acc,
      {
        isForPayment,
        contractAmount,
        billingAmount,
        billedAmount,
        nonTaxableAmount,
      },
    ) => {
      if (isForPayment !== true) return acc;

      const {
        billingAmountBeforeTax,
      } = calculateAmountBeforeTax({              
        contractAmount,
        nonTaxableAmount,
        billingAmount,
        billedAmount,
        taxRate,
      });

      return {
        billingTotalAfterTax: Big(acc.billingTotalAfterTax).plus(billingAmount),
        billingTotalBeforeTax: Big(acc.billingTotalBeforeTax).plus(billingAmountBeforeTax),
      };

    }, {
      billingTotalAfterTax: 0,
      billingTotalBeforeTax: 0,
    });



  /* 税抜金額の算出処理を移管する */

  return (
    <TableRow>
      <TableCell>
        {'請求合計'}
      </TableCell>
      <TableCell align="right">
        {Big(result.billingTotalBeforeTax).round(2).toNumber().toLocaleString()}
      </TableCell>
      <TableCell align="right">
        {Big(result.billingTotalAfterTax).toNumber().toLocaleString()}
      </TableCell>
    </TableRow>
  );
};
import { TableCell, TableRow } from '@mui/material';
import { TMaterials } from '../form';
import { roundTo } from 'libs';

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

      /* 課税対象分から請求に使用していく */
      const taxableAmount = (contractAmount - nonTaxableAmount - billedAmount);

      let billingAmountBeforeTax = 0;
      if ((taxableAmount - billingAmount) >= 0) {
        billingAmountBeforeTax = billingAmount / (1 + taxRate);
      } else {
        billingAmountBeforeTax = (taxableAmount / (1 + taxRate)) + (billingAmount - taxableAmount);
      }

      return {
        billingTotalAfterTax: acc.billingTotalAfterTax + billingAmount,
        billingTotalBeforeTax: acc.billingTotalBeforeTax + billingAmountBeforeTax,
      };
    }, {
      billingTotalAfterTax: 0,
      billingTotalBeforeTax: 0,
    });



  return (
    <TableRow>
      <TableCell>
        {'請求合計'}
      </TableCell>
      <TableCell align="right">
        {roundTo(result.billingTotalBeforeTax, 2).toLocaleString()}
      </TableCell>
      <TableCell align="right">
        {result.billingTotalAfterTax.toLocaleString()}
      </TableCell>
    </TableRow>
  );
};
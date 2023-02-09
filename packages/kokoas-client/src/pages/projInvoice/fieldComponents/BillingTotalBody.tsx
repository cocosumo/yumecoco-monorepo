import { TableCell, TableRow } from '@mui/material';
import { TMaterials } from '../form';
import { roundTo } from 'libs';
import { Big } from 'big.js';

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
      const bTaxableAmount = Big(contractAmount).minus(nonTaxableAmount).minus(billedAmount);
      const bTax = Big(1).plus(taxRate);
        
      if (contractAmount >= 0) { /* 請求書(契約金額が0円以上)の場合 */

        let billingAmountBeforeTax = 0;
        if (bTaxableAmount.toNumber() <= 0) { /* 課税対象金額を使い切っている場合 */
          billingAmountBeforeTax = billingAmount;
        } else if (Big(bTaxableAmount).minus(billingAmount).toNumber() >= 0) { /* 請求額が全額課税対象の場合 */
          billingAmountBeforeTax = Big(billingAmount).div(bTax).toNumber();
        } else { /* 請求金額に課税と非課税が混在する場合 */
          const bNonTaxalbeBillingAmount = Big(billingAmount).minus(bTaxableAmount);
          billingAmountBeforeTax = Big(bTaxableAmount).div(bTax).plus(bNonTaxalbeBillingAmount).toNumber();
        }

        return {
          billingTotalAfterTax: Big(acc.billingTotalAfterTax).plus(billingAmount).toNumber(),
          billingTotalBeforeTax: Big(acc.billingTotalBeforeTax).plus(billingAmountBeforeTax).toNumber(),
        };
      } else {  /* 返金の契約書の場合 */

        let billingAmountBeforeTax = 0;
        if (bTaxableAmount.toNumber() >= 0) { /* 課税対象金額を使い切っている場合 */
          billingAmountBeforeTax = billingAmount;
        } else if (Big(bTaxableAmount).minus(billingAmount).toNumber() <= 0) { /* 請求額が全額課税対象の場合 */
          billingAmountBeforeTax = Big(billingAmount).div(bTax).toNumber();
        } else { /* 請求金額に課税と非課税が混在する場合 */
          const bNonTaxalbeBillingAmount = Big(billingAmount).minus(bTaxableAmount);
          billingAmountBeforeTax = Big(bTaxableAmount).div(bTax).plus(bNonTaxalbeBillingAmount).toNumber();
        }

        return {
          billingTotalAfterTax: Big(acc.billingTotalAfterTax).plus(billingAmount).toNumber(),
          billingTotalBeforeTax: Big(acc.billingTotalBeforeTax).plus(billingAmountBeforeTax).toNumber(),
        };
      }
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
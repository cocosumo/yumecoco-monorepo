import { TableCell, TableRow, Typography } from '@mui/material';
import { TMaterials } from '../form';
import { Big } from 'big.js';
import { calculateAmountBeforeTax } from 'api-kintone';
import { calcTaxAmount } from 'api-kintone/src/invoice/calculation/calcTaxAmount';
import { Caption } from 'kokoas-client/src/components';
import { useMemo } from 'react';

/** 税額　※当面は10%で固定とする */
const taxRate = 0.1;

/** 非課税の適用設定 ※当面は顧客用の請求書のため、非適用とする */
const isNonTaxableUse = false;

interface BillingTotalResult {
  billingTotalAfterTax: number,
  billingTotalBeforeTax: number,
  taxAmount: number,
}

export const BillingTotalBody = ({
  estimates,
}: {
  estimates: TMaterials[]
}) => {


  const result: BillingTotalResult = useMemo(() => {
    if (isNonTaxableUse) {

      estimates.reduce(
        (acc,
          {
            isForPayment,
            contractAmount,
            billingAmount,
            billedAmount,
            nonTaxableAmount,
          },
        ) => {
          if (!isForPayment) return acc;

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
            ...acc,
            billingTotalAfterTax: Big(acc.billingTotalAfterTax).plus(billingAmount).toNumber(),
            billingTotalBeforeTax: Big(acc.billingTotalBeforeTax).plus(billingAmountBeforeTax).toNumber(),
          };

        }, {
          billingTotalAfterTax: 0,
          billingTotalBeforeTax: 0,
          taxAmount: 0,
        });

      return {
        ...result,
        taxAmount: Big(result.billingTotalAfterTax).minus(result.billingTotalBeforeTax).toNumber(),
      };

    } else {
      const billingTotalAfterTax = estimates.reduce((acc, cur) => {

        return Big(acc).plus(cur.billingAmount).toNumber();

      }, 0);

      const taxAmount = calcTaxAmount(billingTotalAfterTax, taxRate);

      return {
        billingTotalAfterTax: billingTotalAfterTax,
        billingTotalBeforeTax: Big(billingTotalAfterTax).minus(taxAmount).toNumber(),
        taxAmount: taxAmount,
      };
    }
  }, [
    estimates,
  ]);

  /* 税抜金額の算出処理を移管する */

  return (
    <>
      <TableRow>
        <TableCell>
          {''}
        </TableCell>
        <TableCell align="left">
          <Typography variant='h6'>
            {'合計金額'}
          </Typography>
        </TableCell>
        <TableCell align="right">
          {`${result.billingTotalAfterTax.toLocaleString()} 円`}
        </TableCell>
      </TableRow>


      <TableRow>
        <TableCell>
          {''}
        </TableCell>
        <TableCell align="left">
          <Caption text='税抜金額' />
        </TableCell>
        <TableCell align="right">
          {`${result.billingTotalBeforeTax.toLocaleString()} 円`}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>
          {''}
        </TableCell>
        <TableCell align="left">
          <Caption text={`消費税額(${useMemo(() => (taxRate * 100), [])}%)`} />
        </TableCell>
        <TableCell align="right">
          {`${result.taxAmount.toLocaleString()} 円`}
        </TableCell>
      </TableRow>
    </>
  );
};
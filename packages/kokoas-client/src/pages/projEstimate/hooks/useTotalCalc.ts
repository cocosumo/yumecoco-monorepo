import { calcProfitRate } from 'api-kintone';
import { useFormikContext } from 'formik';
import { useLazyEffect } from 'kokoas-client/src/hooks';
import { roundTo } from 'libs';
import { useState } from 'react';
import { TypeOfForm } from '../form';

const summaryInit = {
  totalCostPrice: 0,
  grossProfitVal: 0,
  grossProfitRate: 0,
  taxAmount: 0,
  totalAmountBeforeTax: 0,
  totalAmountAfterTax: 0,
};
export type SummaryElem = keyof typeof summaryInit;


export const useTotalCalc = () => {
  const [totalCalc, setTotalCalc] = useState<Array<[SummaryElem, number]>>([]);


  const { values } = useFormikContext<TypeOfForm>();

  useLazyEffect(() => {
    // 合計欄：原価合計、粗利、税抜金額、税込金額の算出処理
    const result = values.items.reduce((acc, cur) => {

      const rowCostPrice = +cur.costPrice * +cur.quantity;

      const rowAmountBeforeTax = cur.unitPrice * +cur.quantity;

      const grossProfitVal = (rowAmountBeforeTax - rowCostPrice );

      acc.totalAmountAfterTax += cur.rowUnitPriceAfterTax;
      acc.totalAmountBeforeTax += rowAmountBeforeTax;
      acc.totalCostPrice += rowCostPrice;
      acc.grossProfitVal += grossProfitVal;

      return acc;

    }, summaryInit);

    const profitRate = calcProfitRate(result.totalCostPrice, result.totalAmountBeforeTax);

    setTotalCalc(Object.entries({
      ...result,
      grossProfitRate: roundTo(profitRate * 100, 2),
      taxAmount: result.totalAmountAfterTax - result.totalAmountBeforeTax,
    }) as Array<[SummaryElem, number]>);

  }, [values], 500);


  return totalCalc;
};
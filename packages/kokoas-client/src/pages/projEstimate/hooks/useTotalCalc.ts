import { calcProfitRate } from 'api-kintone/src/estimates/calculation/calcProfitRate';
import { useFormikContext } from 'formik';
import { useLazyEffect } from 'kokoas-client/src/hooks';
import { roundTo } from 'libs';
import { useState } from 'react';
import { TypeOfForm } from '../form';

const summaryInit = {
  totalCostPrice: 0,
  grossProfitVal: 0,
  grossProfitMargin: 0,
  taxAmount: 0,
  totalAmountExclTax: 0,
  totalAmountInclTax: 0,
};
export type SummaryElem = keyof typeof summaryInit;


export const useTotalCalc = () => {
  const [totalCalc, setTotalCalc] = useState<Array<[SummaryElem, number]>>([]);


  const { values } = useFormikContext<TypeOfForm>();

  useLazyEffect(() => {
    // 合計欄：原価合計、粗利、税抜金額、税込金額の算出処理
    const result = values.items.reduce((acc, cur) => {

      const totalCostPrice = +cur.costPrice * +cur.quantity;
  
      const totalAmountExclTaxVal = cur.unitPrice * +cur.quantity;
  
      const totalAmountInclTaxVal = cur.rowUnitPriceAfterTax;
  
      const grossProfitVal = (totalAmountExclTaxVal - totalCostPrice );
  
      return ({
        ...acc,
        totalCostPrice: acc.totalCostPrice + totalCostPrice,
        grossProfitVal: acc.grossProfitVal + grossProfitVal,
        totalAmountExclTax: acc.totalAmountExclTax + totalAmountExclTaxVal,
        totalAmountInclTax: acc.totalAmountInclTax + totalAmountInclTaxVal,
      });
    }, summaryInit);
  
    const profitRate = calcProfitRate(result.totalCostPrice, result.totalAmountExclTax);

    setTotalCalc(Object.entries({
      ...result,
      grossProfitMargin: roundTo(profitRate * 100, 2),
      taxAmount: result.totalAmountInclTax - result.totalAmountExclTax,
    }) as Array<[SummaryElem, number]>);
  
  }, [values], 500);


  return totalCalc;
};
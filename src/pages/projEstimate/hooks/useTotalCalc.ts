import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';
import { calcTotalUnitPrice } from '../helpers/calcTotalUnitPrice';
import { calcUnitPrice } from '../helpers/calcUnitPrice';

const summaryInit = {
  totalCostPrice: 0,
  grossProfitVal: 0,
  grossProfitMargin: 0,
  taxAmount: 0,
  totalAmountExclTax: 0,
  totalAmountInclTax: 0,
};
export type SummaryElem = keyof typeof summaryInit;


export const useTotalCalc = (): Array<[string, number]> => {
  const { values } = useFormikContext<TypeOfForm>();
  const { taxRate } = values;


  // 合計欄：原価合計、粗利、税抜金額、税込金額の算出処理
  const result = values.items.reduce((acc, cur) => {
    const elemProfPercentage = (+cur.elemProfRate / 100);
    const totalCostPrice = +cur.costPrice * +cur.quantity;
    const grossProfitVal = (totalCostPrice * elemProfPercentage);
    const newUnitPrice = calcUnitPrice(cur.costPrice, cur.elemProfRate);
    const totalAmountExclTaxVal = newUnitPrice * +cur.quantity;
    const totalAmountInclTaxVal = calcTotalUnitPrice(newUnitPrice, cur.quantity, taxRate, cur.tax);

    return ({
      ...acc,
      totalCostPrice: acc.totalCostPrice + totalCostPrice,
      grossProfitVal: acc.grossProfitVal + grossProfitVal,
      totalAmountExclTax: acc.totalAmountExclTax + totalAmountExclTaxVal,
      totalAmountInclTax: acc.totalAmountInclTax + totalAmountInclTaxVal,
    });
  }, summaryInit);

  // 合計欄：粗利率の算出処理
  const provVal = (result.grossProfitVal / result.totalCostPrice) * 100;

  return Object.entries({
    ...result,
    grossProfitMargin: isNaN(provVal) ? 0 : parseFloat(provVal.toFixed(2)),
    taxAmount: result.totalAmountInclTax - result.totalAmountExclTax,
  });
};
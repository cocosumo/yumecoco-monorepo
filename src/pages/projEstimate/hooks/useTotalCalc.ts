import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';
import { calcPrice } from '../helpers/calcPrice';
import { calcUnitPrice } from '../helpers/calcUnitPrice';

export const useTotalCalc = (): Array<[string, number]> => {
  const { values } = useFormikContext<TypeOfForm>();
  const { taxRate } = values;

  // 合計欄：原価合計、粗利、税抜金額、税込金額の算出処理
  const result = values.items.reduce((acc, cur) => {
    const elemProfPercentage = (+cur.elemProfRate / 100);
    const totalCostPrice = +cur.costPrice * +cur.quantity;
    const grossProfitVal = (totalCostPrice * elemProfPercentage);
    const newUnitPrice = calcUnitPrice(cur.costPrice, cur.elemProfRate);
    const taxExcludedAmountVal = newUnitPrice * +cur.quantity;
    const amountIncludingTaxVal = calcPrice(newUnitPrice, cur.quantity, taxRate, cur.tax);

    return ({
      ...acc,
      totalCostPrice: acc.totalCostPrice + totalCostPrice,
      grossProfitVal: acc.grossProfitVal + grossProfitVal,
      taxExcludedAmountVal: acc.taxExcludedAmountVal + taxExcludedAmountVal,
      amountIncludingTaxVal: acc.amountIncludingTaxVal + amountIncludingTaxVal,
    });
  }, { /* acc初期値 */
    totalCostPrice: 0,
    grossProfitVal: 0,
    grossProfitMargin: 0,
    taxAmount: 0,
    taxExcludedAmountVal: 0,
    amountIncludingTaxVal: 0,
  });

  // 合計欄：粗利率の算出処理
  const provVal = (result.grossProfitVal / result.totalCostPrice) * 100;
  const grossProfitMarginVal = isNaN(provVal) ? 0 : parseFloat(provVal.toFixed(2));

  result.grossProfitMargin = grossProfitMarginVal;
  result.taxAmount = result.amountIncludingTaxVal - result.taxExcludedAmountVal;

  return Object.entries(result);
};
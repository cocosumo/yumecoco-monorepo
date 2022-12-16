import { calculateEstimateRow } from 'api-kintone';
import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { roundTo } from 'libs';
import debounce from 'lodash/debounce';
import { ChangeEvent, useMemo } from 'react';
import { TypeOfForm } from '../form';

export const useCalculateRow = <T = number, R = T>({
  watchField,
  rowIdx,
  transform,
} : {
  watchField: keyof Parameters<typeof calculateEstimateRow>[0]
  rowIdx: number,
  transform?: (value: T) => R,
}) => {
  const {
    setValues,
  } = useFormikContext<TypeOfForm>();

  const handleChange = useMemo(
    () => debounce((e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (inputValue === '') return;

      setValues(prev => produce(prev, ({ tax, items }) => {
        const {
          costPrice,
          taxType,
          quantity,
          elemProfRate,
          unitPrice,
          rowUnitPriceAfterTax,
        } = items[rowIdx];

        let prevProfitRate : number | undefined;
        let prevUnitPrice : number | undefined;
        let prevRowUnitPriceAfterTax : number | undefined;
        let prevTaxable = taxType === '課税';
        let prevQuantity = quantity;

        console.log(watchField, costPrice);

        // 編集されたフィールドによって、他フィールドをリセットする
        switch (watchField) {
          case 'rowUnitPriceAfterTax':
            prevProfitRate = undefined;
            prevUnitPrice = undefined;
            break;
          case 'unitPrice':
            prevRowUnitPriceAfterTax = undefined;
            prevProfitRate = undefined;
            break;
          case 'costPrice':
            if (+inputValue < 0) {
              prevTaxable = false;
              prevQuantity = 1;
              prevProfitRate = 0;
            }
            break;
          default:
            prevProfitRate = elemProfRate / 100;
            prevUnitPrice = unitPrice;
            prevRowUnitPriceAfterTax = rowUnitPriceAfterTax;
        }

        const result = calculateEstimateRow({
          isTaxable: prevTaxable,
          taxRate: tax / 100,
          costPrice,
          quantity: prevQuantity,
          profitRate: prevProfitRate,
          unitPrice: prevUnitPrice,
          rowUnitPriceAfterTax: prevRowUnitPriceAfterTax,
          [watchField]: transform?.(inputValue as T) ?? +inputValue,
        });

        items[rowIdx].quantity = result.quantity;
        items[rowIdx].elemProfRate = roundTo(result.profitRate * 100, 2);
        items[rowIdx].unitPrice = Math.round(result.unitPrice);
        items[rowIdx].taxType = result.isTaxable ? '課税' : '非課税';
        items[rowIdx].rowUnitPriceAfterTax = Math.round(result.rowUnitPriceAfterTax);


      }));
    }, 500),
    [setValues, rowIdx, watchField, transform],
  );

  return {
    handleChange,
  };

};
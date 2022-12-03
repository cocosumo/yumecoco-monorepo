import { calculateEstimateRow } from 'api-kintone/src/estimates/calculation/calculateEstimateRow';
import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { roundTo } from 'libs';
import debounce from 'lodash/debounce';
import { ChangeEvent, useMemo } from 'react';
import { TypeOfForm } from '../form';

export const useCalculateRow = ({
  watchField,
  rowIdx,
  transform,
} : {
  watchField: keyof Parameters<typeof calculateEstimateRow>[0]
  rowIdx: number,
  transform?: (value: number) => number
}) => {
  const {
    setValues,
  } = useFormikContext<TypeOfForm>();

  const handleChange = useMemo(
    () => debounce((e: ChangeEvent<HTMLInputElement>) => {

      setValues(prev => produce(prev, ({ tax, items }) => {
        const {
          costPrice,
          taxType,
          quantity,
          elemProfRate,
        } = items[rowIdx];

        const result = calculateEstimateRow({
          isTaxable: taxType === '課税',
          costPrice,
          quantity,
          profitRate: elemProfRate / 100,
          taxRate: tax / 100,
          [watchField]: transform?.(+e.target.value) ?? +e.target.value,
        });


        items[rowIdx].rowUnitPriceAfterTax = result.rowUnitPriceAfterTax;
        items[rowIdx].elemProfRate = roundTo(result.profitRate * 100, 2);
        items[rowIdx].unitPrice = result.unitPrice;

        
      }));
    }, 500),
    [setValues, rowIdx, watchField, transform],
  );

  return {
    handleChange,
  };

};
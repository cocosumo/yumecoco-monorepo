/* Update values based on edited fields */

import { calculateEstimateRow } from 'api-kintone';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../form';

export type UseSmartHandlers =  ReturnType<typeof useSmartHandlers>;
export const useSmartHandlers = () => {
  const { setValue, getValues } = useFormContext<TypeOfForm>();


  const handleChangeCostPrice = useCallback((rowIdx: number, costPrice: number ) => {
    const profitRate = getValues(getItemsFieldName<'items.0.materialProfRate'>(rowIdx, 'materialProfRate')) / 100;
    const taxRate = getValues('taxRate') / 100;
    const isTaxable = getValues(getItemsFieldName<'items.0.taxable'>(rowIdx, 'taxable'));
    const quantity = getValues(getItemsFieldName<'items.0.quantity'>(rowIdx, 'quantity'));

    const {
      rowCostPrice,
      unitPrice,
      rowUnitPriceAfterTax,
    } = calculateEstimateRow({
      costPrice,
      quantity,
      taxRate,
      profitRate,
      isTaxable,
    });

    setValue(getItemsFieldName<'items.0.rowCostPrice'>(rowIdx, 'rowCostPrice'), rowCostPrice);
    setValue(getItemsFieldName<'items.0.unitPrice'>(rowIdx, 'unitPrice'), unitPrice);
    setValue(getItemsFieldName<'items.0.rowUnitPriceAfterTax'>(rowIdx, 'rowUnitPriceAfterTax'), rowUnitPriceAfterTax);

  }, [getValues, setValue]);

  return {
    handleChangeCostPrice,
  };
};
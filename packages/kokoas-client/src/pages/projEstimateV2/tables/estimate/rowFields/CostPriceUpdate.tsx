import { calculateEstimateRow } from 'api-kintone';
import { useLazyEffect } from 'kokoas-client/src/hooks';
import { useFormContext, useWatch } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';

export const CostPriceUpdate = ({
  rowIdx,
}: {
  rowIdx: number
}) => {
  const { control, setValue, getValues, getFieldState } = useFormContext<TypeOfForm>();


  const [
    costPrice,
    quantity,
  ] = useWatch({
    name: [
      getItemsFieldName<'items.0.costPrice'>(rowIdx, 'costPrice'),
      getItemsFieldName<'items.0.quantity'>(rowIdx, 'quantity'),
    ],
    control,
  });

  useLazyEffect(() => {
    const costPriceState = getFieldState(getItemsFieldName<'items.0.costPrice'>(rowIdx, 'costPrice'));
    const quantityState = getFieldState(getItemsFieldName<'items.0.quantity'>(rowIdx, 'quantity'));

    if (!costPriceState.isDirty && !quantityState.isDirty ) return;


    const profitRate = getValues(getItemsFieldName<'items.0.materialProfRate'>(rowIdx, 'materialProfRate')) / 100;
    const taxRate = getValues('taxRate') / 100;
    const isTaxable = getValues(getItemsFieldName<'items.0.taxable'>(rowIdx, 'taxable'));

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

  },
  [costPrice, quantity, setValue, getFieldState],
  500);

  return (null);
};
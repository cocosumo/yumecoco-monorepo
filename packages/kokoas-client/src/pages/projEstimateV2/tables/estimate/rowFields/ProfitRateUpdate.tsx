import { calculateEstimateRow } from 'api-kintone';
import { useLazyEffect } from 'kokoas-client/src/hooks';
import { useFormContext, useWatch } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';

export const ProfitRateUpdate = ({
  rowIdx,
}: {
  rowIdx: number
}) => {
  const { control, setValue, getValues, getFieldState } = useFormContext<TypeOfForm>();
  
  const profitRate = useWatch({
    name: getItemsFieldName<'items.0.materialProfRate'>(rowIdx, 'materialProfRate'),
    control,
  });

  useLazyEffect(() => {
    const profitRateState = getFieldState(getItemsFieldName<'items.0.materialProfRate'>(rowIdx, 'materialProfRate'));
    if (!profitRateState.isDirty) return;

    const taxRate = getValues('taxRate') / 100;
    const isTaxable = getValues(getItemsFieldName<'items.0.taxable'>(rowIdx, 'taxable'));
    const costPrice = getValues(getItemsFieldName<'items.0.costPrice'>(rowIdx, 'costPrice'));
    const quantity = getValues(getItemsFieldName<'items.0.quantity'>(rowIdx, 'quantity'));

    const {
      unitPrice,
      rowUnitPriceAfterTax,
    } = calculateEstimateRow({
      costPrice,
      quantity,
      taxRate,
      profitRate: profitRate / 100,
      isTaxable,
    });
    
    setValue(getItemsFieldName<'items.0.unitPrice'>(rowIdx, 'unitPrice'), unitPrice);
    setValue(getItemsFieldName<'items.0.rowUnitPriceAfterTax'>(rowIdx, 'rowUnitPriceAfterTax'), rowUnitPriceAfterTax);

  },
  [profitRate, setValue, getValues, getFieldState],
  500,
  );


  return null;
}; 
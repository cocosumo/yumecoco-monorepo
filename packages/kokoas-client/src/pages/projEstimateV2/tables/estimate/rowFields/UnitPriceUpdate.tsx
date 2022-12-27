import { calculateEstimateRow } from 'api-kintone';
import { useLazyEffect } from 'kokoas-client/src/hooks';
import { roundTo } from 'libs';
import { useFormContext, useWatch } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';

export const UnitPriceUpdate = ({
  rowIdx,
}: {
  rowIdx: number
}) => {
  const { control, setValue, getValues, getFieldState } = useFormContext<TypeOfForm>();

  const [
    unitPrice,
  ] = useWatch({
    name: [
      getItemsFieldName<'items.0.unitPrice'>(rowIdx, 'unitPrice'),
    ],
    control,
  });

  useLazyEffect(() => {
    const unitPriceState = getFieldState(getItemsFieldName<'items.0.unitPrice'>(rowIdx, 'unitPrice'));
    if (!unitPriceState.isDirty) return;

    const taxRate = getValues('taxRate') / 100;
    const isTaxable = getValues(getItemsFieldName<'items.0.taxable'>(rowIdx, 'taxable'));
    const costPrice = getValues(getItemsFieldName<'items.0.costPrice'>(rowIdx, 'costPrice'));
    const quantity = getValues(getItemsFieldName<'items.0.quantity'>(rowIdx, 'quantity'));

    const {
      rowUnitPriceAfterTax,
      profitRate,
    } = calculateEstimateRow({
      unitPrice,
      costPrice,
      quantity,
      taxRate,
      isTaxable,
    });

    setValue(getItemsFieldName<'items.0.materialProfRate'>(rowIdx, 'materialProfRate'), roundTo(profitRate * 100, 2));
    setValue(getItemsFieldName<'items.0.rowUnitPriceAfterTax'>(rowIdx, 'rowUnitPriceAfterTax'), rowUnitPriceAfterTax);

  },
  [unitPrice, setValue, getValues, getFieldState],
  500,
  );

  return null;
};
import { calculateEstimateRow } from 'api-kintone';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { debounce } from 'lodash';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';
import { ControlledMaskedCurrencyInput } from './ControlledMaskedCurrencyInput';

export const RowUnitPriceBeforeTax = ({
  rowIdx,
  handleChange,
  handleUpdateSummary,
}: {
  rowIdx: number,
  handleChange: UseSmartHandlers['handleChangeRowUnitPricBeforeTax'],
  handleUpdateSummary: UseSmartHandlers['handleUpdateSummary']
}) => {
  const { setSnackState } = useSnackBar();
  const { getValues, setValue } = useFormContext<TypeOfForm>();


  /* 入力した値を検証する */
  const handleAmountCorrection = useMemo(
    () => debounce(
      () => {
        console.log('fired!');
        const taxRate = getValues('taxRate') / 100;
        const newRowUnitPriceBeforeTax = getValues(getItemsFieldName<'items.0.rowUnitPriceBeforeTax'>(rowIdx, 'rowUnitPriceBeforeTax'));
        const isTaxable = getValues(getItemsFieldName<'items.0.taxable'>(rowIdx, 'taxable'));
        const unitPrice =  getValues(getItemsFieldName<'items.0.unitPrice'>(rowIdx, 'unitPrice'));
        const newQuantity =  getValues(getItemsFieldName<'items.0.unitPrice'>(rowIdx, 'quantity'));

        const {
          rowUnitPriceBeforeTax: validatedRowUnitPriceBeforeTax,
        } = calculateEstimateRow({
          unitPrice,
          quantity: newQuantity,
          taxRate,
          isTaxable,
        });

        if (+newRowUnitPriceBeforeTax !== +validatedRowUnitPriceBeforeTax) {

          setSnackState({
            open: true,
            message: `${rowIdx + 1}行の金額に入力した数字は単価と数量から逆算出来ません。${validatedRowUnitPriceBeforeTax}円 に設定します。`,
            severity: 'warning',
          });
          setValue(getItemsFieldName<'items.0.rowUnitPriceBeforeTax'>(rowIdx, 'rowUnitPriceBeforeTax'), validatedRowUnitPriceBeforeTax);
          handleUpdateSummary();
        }
      },
      2000,
    ),
    [rowIdx, getValues, setSnackState, setValue, handleUpdateSummary],
  );



  return (
    <ControlledMaskedCurrencyInput
      rowIdx={rowIdx}
      handleChange={() => {
        handleChange(rowIdx);
        handleAmountCorrection();
      }}
      fieldName={'rowUnitPriceBeforeTax'}
    />

  );
};
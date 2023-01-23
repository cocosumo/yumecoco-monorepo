import { calculateEstimateRow } from 'api-kintone';
import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { debounce } from 'lodash';
import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { getItemsFieldName } from '../../../form';
import { useEstField } from '../../../hooks/useEstField';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';

export const RowUnitPriceBeforeTax = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number,
  handleChange: UseSmartHandlers['handleChangeRowUnitPricBeforeTax']
}) => {
  const { setSnackState } = useSnackBar();
  const {
    fieldName,
    formContext: { 
      register, 
      getValues, 
      setValue,
      control, 
    },
    ...fieldProps
  } = useEstField({
    fieldName: 'rowUnitPriceBeforeTax',
    rowIdx,
  });

  const [
    quantity,
    envStatus,
  ] = useWatch({
    name: [
      getItemsFieldName(rowIdx, 'quantity'),
      'envStatus',
    ],
    control,
  });

  
  /* 入力した値を検証する */
  const handleAmountCorrection = useMemo(
    () => debounce(
      () => {

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

        }
      }, 
      2000,
    ), 
    [rowIdx, getValues, setSnackState, setValue], 
  );

  

  return (
    <OutlinedMoneyInput
      {...fieldProps}
      {...register(
        fieldName,
        {
          onChange: () => {
            handleChange(rowIdx);
            handleAmountCorrection();
          },
        })
      }
      disabled={!!envStatus || !+(quantity ?? 0)}
    />
  );
};
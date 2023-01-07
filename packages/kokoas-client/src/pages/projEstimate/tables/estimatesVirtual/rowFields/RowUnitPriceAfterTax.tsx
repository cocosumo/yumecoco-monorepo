import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import { useWatch } from 'react-hook-form';
import { getItemsFieldName } from '../../../form';
import { useEstField } from '../../../hooks/useEstField';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';

export const RowUnitPriceAfterTax = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number,
  handleChange: UseSmartHandlers['handleChangeRowUnitPriceAfterTax']
}) => {
  const { 
    formContext: { register, control }, 
    fieldName,
    ...fieldProps
  } = useEstField({
    fieldName: 'rowUnitPriceAfterTax',
    rowIdx,
  });

  const [
    costPrice,
    envStatus,
  ] = useWatch({
    name: [
      getItemsFieldName(rowIdx, 'costPrice'),
      'envStatus',
    ],
    control,
  });



  return (
    <OutlinedMoneyInput
      {...fieldProps}
      {...register(
        fieldName,
        {
          onChange: () => handleChange(rowIdx),
        })
      }
      disabled={!!envStatus || !+(costPrice ?? 0)}
    />
  );
};
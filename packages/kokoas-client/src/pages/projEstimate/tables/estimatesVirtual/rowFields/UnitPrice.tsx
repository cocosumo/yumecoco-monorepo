import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import { useWatch } from 'react-hook-form';
import { getItemsFieldName } from '../../../form';
import { useEstField } from '../../../hooks/useEstField';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';

export const UnitPrice = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number
  handleChange: UseSmartHandlers['handleChangeUnitPrice']
}) => {

  const { 
    formContext: { register, control }, 
    fieldName,
    ...fieldProps
  } = useEstField({
    fieldName: 'unitPrice',
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
import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import { useWatch } from 'react-hook-form';
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
    envStatus,
  ] = useWatch({
    name: [
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
      disabled={!!envStatus}
    />

  );
};
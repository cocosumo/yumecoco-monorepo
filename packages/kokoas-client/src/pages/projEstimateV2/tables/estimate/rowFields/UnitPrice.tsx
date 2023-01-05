import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import { useFormContext, useWatch } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';

export const UnitPrice = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number
  handleChange: UseSmartHandlers['handleChangeUnitPrice']
}) => {

  const {
    register,
    control,
  } = useFormContext<TypeOfForm>();

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
      disabled={!!envStatus || !+(costPrice ?? 0)}
      {...register(
        getItemsFieldName(rowIdx, 'unitPrice'),
        {
          onChange: () => handleChange(rowIdx),
        })
    }
    />

  );
};
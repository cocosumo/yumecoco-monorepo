import { OutlinedInputProps } from '@mui/material';
import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import { useFormContext, useFormState } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';

export const CostPrice = ({
  rowIdx,
  handleChange,
}: OutlinedInputProps & {
  rowIdx: number
  handleChange: UseSmartHandlers['handleChangeCostPrice']

}) => {
  const fieldName = getItemsFieldName(rowIdx, 'costPrice');
  const { register, control } = useFormContext<TypeOfForm>();
  const {
    errors: {
      items,
    },
  } = useFormState({
    name: fieldName,
    control,
  });

  return (
    <OutlinedMoneyInput
      {...register(
        fieldName,
        {
          onChange: () => handleChange(rowIdx),
        })}
      onFocus={({ target }) => target.select()}
      error={!!items?.[rowIdx]}
    />
  );
};
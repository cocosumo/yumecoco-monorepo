import { OutlinedInputProps } from '@mui/material';
import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import { useFormContext } from 'react-hook-form';
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
  const { register } = useFormContext<TypeOfForm>();

  return (
    <OutlinedMoneyInput
      {...register(
        fieldName, 
        {
          onChange: () => handleChange(rowIdx),
        })}
      onFocus={({ target }) => target.select()}
    />
  );
};
import { OutlinedInputProps } from '@mui/material';
import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import { useEstField } from '../../../hooks/useEstField';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';

export const CostPrice = ({
  rowIdx,
  handleChange,
}: OutlinedInputProps & {
  rowIdx: number
  handleChange: UseSmartHandlers['handleChangeCostPrice']

}) => {
  const { 
    formContext: { register }, 
    fieldName,
    ...fieldProps
  } = useEstField({
    fieldName: 'costPrice',
    rowIdx,
  });

  return (
    <OutlinedMoneyInput
      {...fieldProps}
      {...register(
        fieldName,
        {
          onChange: () => handleChange(rowIdx),
        })}
      
    />
  );
};
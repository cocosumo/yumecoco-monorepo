import { OutlinedInputProps } from '@mui/material';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';
import { ControlledCurrencyInput } from './ControlledCurrencyInput';

export const CostPrice = ({
  rowIdx,
  handleChange,
}: OutlinedInputProps & {
  rowIdx: number
  handleChange: UseSmartHandlers['handleChangeCostPrice']
}) => {



  return (
    <ControlledCurrencyInput 
      fieldName='costPrice'
      handleChange={() => handleChange(rowIdx)}
      rowIdx={rowIdx}
    />
  );
};
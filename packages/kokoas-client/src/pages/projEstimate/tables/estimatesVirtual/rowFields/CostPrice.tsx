import { OutlinedInputProps } from '@mui/material';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';
import { ControlledMaskedCurrencyInput } from './ControlledMaskedCurrencyInput';

export const CostPrice = ({
  rowIdx,
  handleChange,
}: OutlinedInputProps & {
  rowIdx: number
  handleChange: UseSmartHandlers['handleChangeCostPrice']
}) => {

  return (
    <ControlledMaskedCurrencyInput
      rowIdx={rowIdx}
      handleChange={() => handleChange(rowIdx)}
      fieldName={'costPrice'}
    />
  );
};
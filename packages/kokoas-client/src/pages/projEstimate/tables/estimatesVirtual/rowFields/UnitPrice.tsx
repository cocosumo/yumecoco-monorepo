import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';
import { ControlledMaskedCurrencyInput } from './ControlledMaskedCurrencyInput';

export const UnitPrice = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number
  handleChange: UseSmartHandlers['handleChangeUnitPrice']
}) => {

  return (
    <ControlledMaskedCurrencyInput
      rowIdx={rowIdx}
      handleChange={() => handleChange(rowIdx)}
      fieldName={'unitPrice'}
    />
  );
};
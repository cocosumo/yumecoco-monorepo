import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';
import { ControlledCurrencyInput } from './ControlledCurrencyInput';

export const UnitPrice = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number
  handleChange: UseSmartHandlers['handleChangeUnitPrice']
}) => {

  return (
    <ControlledCurrencyInput
      rowIdx={rowIdx}
      handleChange={() => handleChange(rowIdx)}
      fieldName={'unitPrice'}
    />
  );
};
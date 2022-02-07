import { InputField } from '../../../types/forms';
import BasicSelect, { BasicSelectProps } from './BasicSelect';
import useCustomerFieldState from '../../../hooks/useCustomerFieldState';

interface CustomerSelectProps extends BasicSelectProps {
  fieldState: InputField
}

const CustomerSelect = ({ label, name, options, value, helperText, isRequired, fieldState, onChange } : CustomerSelectProps) => {

  const { hasError : hasErrorResolved } = useCustomerFieldState(fieldState);
  return (
    <BasicSelect options={options} helperText={helperText} hasError={hasErrorResolved} name={name} label={label} isRequired={isRequired} value={value} onChange={onChange} />

  );
};

export default CustomerSelect;
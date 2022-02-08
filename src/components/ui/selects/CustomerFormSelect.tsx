
import BasicSelect, { BasicSelectProps } from './BasicSelect';




const CustomerFormSelect = ({ label, hasError, name, options, value, helperText, isRequired, onChange }: BasicSelectProps) => {

  const isEmptyOptions = options.length === 0;
  const isDisabled = isEmptyOptions;

  return (
    <BasicSelect
      options={options}
      helperText={helperText}
      hasError={hasError && !isDisabled}
      name={name} label={label}
      isRequired={isRequired} 
      value={value} 
      onChange={onChange} 
      disabled={isDisabled} 
      />

  );
};

export default CustomerFormSelect;

import BasicSelect, { BasicSelectProps } from './BasicSelect';




export const AgentFormSelect = ({ label, hasError, name, options, value, helperText, isRequired, isDisabled, onChange }: BasicSelectProps) => {

  const isEmptyOptions = options?.length === 0;
  const disabled = isDisabled || isEmptyOptions;

  return (
    <BasicSelect
      options={options}
      helperText={disabled ? '' : helperText}
      hasError={hasError && !disabled}
      name={name} label={label}
      isRequired={disabled ? false : isRequired}
      value={value}
      onChange={onChange}
      disabled={disabled}
      />

  );
};
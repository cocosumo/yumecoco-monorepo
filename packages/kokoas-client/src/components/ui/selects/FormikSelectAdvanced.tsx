import { FormControl, Select, MenuItem, InputLabel, FormHelperText, SelectChangeEvent } from '@mui/material';

import { useField } from 'formik';
import { memo, useMemo } from 'react';


/**
 * FormikSelectと違い、
 * optionsの内容は自由
 *  */
export function FormikSelectAdvanced(props : {
  name: string,
  label: string
  required?: boolean
  helperText?: string
  options?: OptionNode[],
  selectedValue?: string,
  disabled?: boolean,
  onChange?: (e: SelectChangeEvent) => void
  variant?: 'standard' | 'outlined' | 'filled'
}) {

  const {
    required,
    label,
    options,
    helperText,
    disabled = false,
    selectedValue,
    onChange,
    variant = 'outlined',
  } = props;
  const [
    field,
    meta,
  ] = useField(props);

  const {
    touched,
  } = meta;


  const isShowError = touched && !!meta.error && !disabled;

  const optionMenus = useMemo(() => options?.map((option) => {
    const isSelected = option.value === selectedValue;
    return (
      <MenuItem key={option.key} value={option.value} selected={isSelected}>
        {option.component}
      </MenuItem>
    );
  }), [options, selectedValue]);

  return (
    <FormControl 
      required={required} 
      fullWidth 
      error={isShowError}
      disabled={disabled}
    >
      <InputLabel error={isShowError}>
        {label}
      </InputLabel>
      <Select
        {...field}
        variant={variant}
        error={isShowError}
        label={label}
        required={required}
        value={field.value ?? ''}
        disabled={disabled}
        onChange={
        (e)=>{
          if (onChange) onChange(e);
          field.onChange(e);
        }
      }
      >
        {optionMenus}

      </Select>
      {isShowError && <FormHelperText error={isShowError}>
        {meta.error}
      </FormHelperText>}
      {helperText && <FormHelperText>
        {helperText}
      </FormHelperText>}
    </FormControl>
  );
}

export const MemoizedFormikSelectAdvanced = memo(FormikSelectAdvanced);
import { FormControl, Select, MenuItem, InputLabel, FormHelperText, Stack, SelectChangeEvent } from '@mui/material';

import { useField } from 'formik';
import Chip from '@mui/material/Chip';
import { memo, useMemo } from 'react';


export interface FormikSelecProps {
  name: string,
  label: string
  required?: boolean
  helperText?: string
  options?: Options,
  disabled?: boolean,
  onChange?: (e: SelectChangeEvent, label: string) => void
  variant?: 'standard' | 'outlined' | 'filled'
}

export function FormikSelect(props : FormikSelecProps) {

  const {
    required,
    label,
    options,
    helperText,
    disabled = false,
    onChange,
    variant = 'outlined',
    name,
  } = props;

  const [
    field,
    meta,
  ] = useField(name);

  const {
    touched,
  } = meta;


  const isExistInOptions = options?.some(item => item.value === field.value || item.label === field.value);
  const isShowError = touched && !!meta.error && !disabled;


  const optionMenus = useMemo(() => options?.map((option) => {
    return (
      <MenuItem key={option.value || option.label} value={option.value || ''}>
        <Stack direction="row" spacing={1}>
          {option.secondaryLabel && <Chip label={option.secondaryLabel} variant="outlined" size="small" />}
          <div>
            {option.label}
          </div>
        </Stack>
      </MenuItem>
    );
  }), [options]);



  return (
    <FormControl required={required} fullWidth error={isShowError}>
      <InputLabel error={isShowError}>
        {label}
      </InputLabel>
      <Select
        {...field}
        variant={variant}
        error={isShowError}
        label={label}
        required={required}
        value={isExistInOptions ? field.value ?? '' : ''}
        disabled={disabled}
        onChange={(e)=>{
          const newVal = e.target.value;
          const newValText = options?.find((option) => option.value === newVal)?.label;
          if (onChange) onChange(e, newValText?.toString() || '');
          field.onChange(newVal);
        }}
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

export const MemoizedFormikSelect = memo(FormikSelect);
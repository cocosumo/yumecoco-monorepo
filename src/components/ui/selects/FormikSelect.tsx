import { FormControl, Select, MenuItem, InputLabel, FormHelperText, Stack } from '@mui/material';

import { useField, useFormikContext } from 'formik';
import Chip from '@mui/material/Chip';
import { useEffect } from 'react';


export interface FormikSelecProps {
  name: string,
  label: string
  required?: boolean
  helperText?: string
  options?: Options,
  disabled?: boolean,
  variant?: 'standard' | 'outlined' | 'filled'
}

export function FormikSelect(props : FormikSelecProps) {
  const {
    required,
    label,
    options,
    helperText,
    disabled = false,
    
    variant = 'outlined',
  } = props;
  const [
    field,
    meta,
  ] = useField(props);

  const {
    touched,
  } = meta;

  const { setFieldValue } = useFormikContext();
  const isExistInOptions = options?.some(item => item.value === field.value || item.label === field.value);
  const isShowError = touched && !!meta.error && !disabled;

  useEffect(()=>{
    if (!isExistInOptions || disabled){
      setFieldValue(field.name, '');
    }
  }, [isExistInOptions, disabled]);

  return (
    <FormControl required={required} fullWidth error={isShowError }>
      <InputLabel error={isShowError}>{label}</InputLabel>
      <Select {...field} variant={variant}  error={isShowError} label={label} required={required} value={field.value ?? ''} disabled={disabled}>

        {
          options &&
          options.map((option) => <MenuItem key={option.value || option.label} value={option.value || ''}>
            <Stack direction="row" spacing={1}>
              {option.secondaryLabel && <Chip label={option.secondaryLabel} variant="outlined" size="small"/>}
              <div>{option.label}</div>
            </Stack>
          </MenuItem>)
        }
      </Select>
      {isShowError && <FormHelperText error={isShowError}>{meta.error}</FormHelperText>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
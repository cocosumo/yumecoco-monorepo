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
  variant?: 'standard' | 'outlined' | 'filled'
}

export function FormikSelect(props : FormikSelecProps) {
  const {
    required,
    label,
    options,
    helperText,
    variant = 'outlined',
  } = props;
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const isExistInOptions = options?.some(item => item.value === field.value || item.label === field.value);

  useEffect(()=>{
    if (!isExistInOptions){
      setFieldValue(field.name, '');
    }
  }, [isExistInOptions]);


  return (
    <FormControl required={required} fullWidth error={!!meta.error}>
      <InputLabel error={!!meta.error}>{label}</InputLabel>
      <Select variant={variant}  error={!!meta.error} label={label} required={required} {...field}>

        {
          options &&
          options.map((option) => <MenuItem key={option.value || option.label} value={option.value || option.label}>
            <Stack direction="row" spacing={1}>
              {option.secondaryLabel && <Chip label={option.secondaryLabel} variant="outlined" size="small"/>}
              <div>{option.label}</div>
            </Stack>
          </MenuItem>)
        }
      </Select>
      <FormHelperText error={!!meta.error}>{meta.error}</FormHelperText>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
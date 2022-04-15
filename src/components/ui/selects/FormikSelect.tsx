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
  onChange?: (e: SelectChangeEvent) => void
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
  } = props;
  const [
    field,
    meta,
  ] = useField(props);

  const {
    touched,
  } = meta;

  //const { setFieldValue } = useFormikContext<CustomerForm>();
  //const isExistInOptions = options?.some(item => item.value === field.value || item.label === field.value);
  const isShowError = touched && !!meta.error && !disabled;

  /*  useEffect(()=>{
    // Clears field, @deprecated, changing approach as this also clear initialValues of edit
    if (!isExistInOptions || disabled){
      setFieldValue(field.name, '');
    }
  }, [isExistInOptions, disabled]);
 */

  const optionMenus = useMemo(() => options?.map((option) => {
    return (<MenuItem key={option.value || option.label} value={option.value || ''}>
      <Stack direction="row" spacing={1}>
        {option.secondaryLabel && <Chip label={option.secondaryLabel} variant="outlined" size="small"/>}
        <div>{option.label}</div>
      </Stack>
    </MenuItem>);
  }), [options]);



  return (
    <FormControl required={required} fullWidth error={isShowError }>
      <InputLabel error={isShowError}>{label}</InputLabel>
      <Select
      {...field}
      variant={variant}
      error={isShowError}
      label={label}
      required={required}
      value={field.value}
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
      {isShowError && <FormHelperText error={isShowError}>{meta.error}</FormHelperText>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export const MemoizedFormikSelect = memo(FormikSelect);
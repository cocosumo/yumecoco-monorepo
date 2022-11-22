import { FormControl, Select, MenuItem, InputLabel, FormHelperText, Stack, SelectChangeEvent } from '@mui/material';
import Chip from '@mui/material/Chip';
import { memo, useEffect, useMemo } from 'react';
import { useFieldFast } from 'kokoas-client/src/hooks/useFieldFast';


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
    helpers,
  ] = useFieldFast(name);

  const {
    touched,
  } = meta;

  const {
    setValue,
  } = helpers;


  const isExistInOptions = options?.some(item => item.value === field.value || item.label === field.value);
  const isShowError = touched && !!meta.error && !disabled;

  useEffect(() => { 
    if (!isExistInOptions) {
      /** valueは選択肢にないなら、空にする */
      setValue('');
    }
  }, [isExistInOptions, setValue]);


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
          field.onChange(e);
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
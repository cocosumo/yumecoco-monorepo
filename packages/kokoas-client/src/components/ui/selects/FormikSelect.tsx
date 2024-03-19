import { FormControl, Select, MenuItem, InputLabel, FormHelperText, Stack, SelectChangeEvent } from '@mui/material';
import Chip from '@mui/material/Chip';
import { ComponentProps, memo, useEffect, useMemo } from 'react';
import { useFieldFast } from 'kokoas-client/src/hooks/useFieldFast';


export interface FormikSelecProps extends ComponentProps<typeof Select> {
  name: string,
  label?: string
  helperText?: string
  enabledFormikBlur?: boolean,
  options?: Options,
  onChange?: (e: SelectChangeEvent, label: string) => void
}

export function FormikSelect(props : FormikSelecProps) {

  const {
    multiple,
    required,
    label,
    options,
    helperText,
    disabled = false,
    onChange,
    variant = 'outlined',
    name,
    enabledFormikBlur = true,
    ...otherSelectProps
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

  const isExistInOptions = options?.some(opt => {
    if (typeof field.value === 'string') {
      return opt.value === field.value || opt.label === field.value;
    }
  });

  const isShowError = touched && !!meta.error && !disabled;

  useEffect(() => {

    if (!!options?.length && !isExistInOptions && !multiple ) {
      /** valueは選択肢にないなら、削除 */
      setValue('');
    }

  }, [setValue, multiple, isExistInOptions, options?.length]);


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
    <FormControl
      required={required} fullWidth
      error={isShowError}
    >
      {!!label && <InputLabel error={isShowError}>
        {label}
      </InputLabel>}
      <Select
        {...otherSelectProps}
        {...field}
        fullWidth
        disabled={disabled}
        multiple={multiple}
        variant={variant}
        error={isShowError}
        label={label}
        required={required}
        value={field.value}
        onBlur={(e) => {
          if (enabledFormikBlur) {
            field.onBlur(e);
          }
        }}
        onChange={(e)=>{
          const newVal = e.target.value ;
          const newValText = options?.find((option) => option.value === newVal)?.label;

          if (onChange) onChange(e as SelectChangeEvent, newValText?.toString() || '');
          if (multiple) {
            helpers.setValue(typeof newVal === 'string' ? newVal.split(',') : newVal);
          } else {
            field.onChange(e);
          }

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
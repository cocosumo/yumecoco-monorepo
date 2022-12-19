import { Autocomplete, debounce, FormControl, FormHelperText, TextField, TextFieldProps } from '@mui/material';
import { useFieldFast } from 'kokoas-client/src/hooks/useFieldFast';
import { ComponentProps, useMemo, useState } from 'react';
import { Options, Option } from 'types';

/*
  useFieldはレンダリングたび、異なるリファレンスになるので、
  依存している値の配列に入れると不安定です。
  変わりに、setFieldValueを利用します。
  https://github.com/jaredpalmer/formik/issues/2268

  Formik V3で修正したようです。リリースしたら、更新しましょう。
*/

export const FormikAutocomplete = (
  { name,
    options,
    handleChange,
    disabled = false,
    freeSolo = true,
    variant = 'standard',
    ...otherAutoCompleteProps
  }: Omit<ComponentProps<typeof Autocomplete>, 'renderInput'> & {
    name: string,
    options: Options
    handleChange?: (newVal?: string) => void
    disabled?: boolean
    variant?: TextFieldProps['variant']
  },
) => {

  const [field, meta, helper] = useFieldFast(name);
  const { touched, error } = meta;
  const { setValue } = helper;

  const [fieldVal, setFieldVal] = useState<Option>({
    label: field.value as string,
    value: field.value as string,
  });

  const handleInputChange = useMemo(() =>
    debounce((_, value: string) => {
      if (handleChange) handleChange(value);
      setValue(value);
    }, 1000), [handleChange, setValue]);

  return (
    <FormControl variant="standard" size='small' fullWidth>
      <Autocomplete
        {...field}
        {...otherAutoCompleteProps}
        fullWidth
        freeSolo={freeSolo}
        value={fieldVal}
        onChange={(_, newVal) => {
          setFieldVal(newVal as Option);
        }}
        options={(options as Options).map(({ value }) => value)}
        renderInput={(params) =>
          (
            <TextField {...params}
              type="search"
              size="small"
              variant={variant}
            />
          )}
        onInputChange={handleInputChange}
        disabled={disabled}
      />
      {(!!error && touched) &&
        <FormHelperText error={!!error && touched}>
          {error}
        </FormHelperText>}
    </FormControl>
  );
};
import { Autocomplete, FormControl, FormHelperText, TextField, TextFieldProps } from '@mui/material';
import { useFieldFast } from 'kokoas-client/src/hooks/useFieldFast';
import { ChangeEvent, ComponentProps, useEffect, useState } from 'react';
import { Options } from 'types';
import { useDebounce } from 'usehooks-ts';

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
  const [inputValue, setInputValue] = useState<string>(field.value);
  const debouncedValue = useDebounce<string>(inputValue, 800);

  const handleAccept = (e: ChangeEvent, newValue: string) => {
    setInputValue(newValue);
    handleChange?.(newValue);
  };

  useEffect(() => {
    setValue(debouncedValue, true);

  }, [debouncedValue, setValue]);

  useEffect(() => {
    setInputValue(field.value);
  }, [field.value]);


  return (
    <FormControl variant="standard" size='small' fullWidth>
      <Autocomplete
        {...field}
        {...otherAutoCompleteProps}
        fullWidth
        freeSolo={freeSolo}
        value={inputValue}
        onChange={handleAccept}
        options={(options as Options).map(({ value }) => value)}
        renderInput={(params) =>
          (
            <TextField {...params}
              type="search"
              size="small"
              variant={variant}
            />
          )}
        disabled={disabled}
      />
      {(!!error && touched) &&
        <FormHelperText error={!!error && touched}>
          {error}
        </FormHelperText>}
    </FormControl>
  );
};
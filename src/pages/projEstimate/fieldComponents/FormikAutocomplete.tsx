import { debounce, FormControl, FormHelperText, TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import { useMemo } from 'react';
import { TypeOfForm } from '../form';


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
  }: {
    name: string,
    options: Options
    handleChange?: (newVal?: string) => void
    disabled?: boolean
  },
) => {

  const { setFieldValue } = useFormikContext<TypeOfForm>();
  const [field, meta] = useField(name);
  const { touched, error } = meta;

  const handleInputChange = useMemo(() =>
    debounce((_, value) => {
      if (handleChange) handleChange(value);
      setFieldValue(name, value);
    }, 1000), [setFieldValue, name, handleChange]);

  return (
    <FormControl variant="standard" size='small' fullWidth>
      <Autocomplete {...field}
        freeSolo
        options={options.map(({ value }) => value)}
        renderInput={(params) =>
          (
            <TextField {...params}
              type="search"
              variant="standard"
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
import { TextField, TextFieldProps } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { useFieldFast } from '../../../hooks/useFieldFast';

/**
 * MUI TextField that can be binded to Formik by
 * specifying the 'name' prop.
 *
 * This also 'debounce' the input so it won't re-render on every keystroke.
 *
 */
export const FormikTextFieldV2 = (
  props: TextFieldProps & {
    name: string,
  },
) => {
  const {
    name,
    onChange,
    onBlur,
    fullWidth = true,
    helperText,
    ...others
  } = props;
  const [field, meta, helpers] = useFieldFast(name);
  const [inputValue, setInputValue] = useState<string>(field.value);
  const debouncedValue = useDebounce<string>(inputValue, 800);

  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;
  const isShowError = touched && !!error;

  const handleChange: TextFieldProps['onChange'] = (e) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  useEffect(() => {
    setTouched(true);
    setValue(debouncedValue, true);
  }, [debouncedValue, setValue, setTouched]);

  useEffect(() => {
    setInputValue(field.value);
  }, [field.value]);


  return (
    <TextField
      {...others}
      {...field}
      value={inputValue}
      onChange={handleChange}
      onBlur={((e)=>{
        field.onBlur(e);
        onBlur?.(e);
      })}
      error={isShowError}
      helperText={meta.error || helperText}
      fullWidth={fullWidth}
    />
  );
};
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

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
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(inputValue, 500);
  const [field, meta, helpers] = useField(name);

  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;
  const isShowError = touched && !!error;


  const handleChange: TextFieldProps['onChange'] = (e) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  useEffect(() => {
    console.log('Fired!');
    setValue(debouncedValue);
    setTouched(true);
  }, [debouncedValue, setValue, setTouched]);


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
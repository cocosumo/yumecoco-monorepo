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
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(inputValue, 800);
  const [field, meta, helpers] = useFieldFast(name);

  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;
  const isShowError = touched && !!error;

  const handleChange: TextFieldProps['onChange'] = (e) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  useEffect(() => {
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
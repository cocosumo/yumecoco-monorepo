import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';

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
  const [field, meta] = useField(name);
  const { error, touched } = meta;
  const isShowError = touched && !!error;

  return (
    <TextField
      {...others}
      {...field}
      onChange={((e)=>{
        field.onChange(e);
        onChange?.(e);
      })}
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
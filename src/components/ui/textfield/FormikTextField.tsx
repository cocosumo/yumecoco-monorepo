import { TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';


interface FormikTextFieldProps {
  name: string,
  label: string,
  value?: string,
  onBlur?: (e: React.FocusEvent<any, Element>)=>void,
  onChange?: (e: React.ChangeEvent<any>) => void,
  placeholder?: string,
  helperText?: string,
  required?: boolean,
  inputComponent?: any,
  endAdornment?: JSX.Element

}

export const FormikTextField = (props: FormikTextFieldProps) => {
  const { helperText, label, placeholder, required } = props;
  const [field, meta] = useField(props);

  return (
    <TextField  {...field}
    label={label}
    placeholder={placeholder}
    required={required}
    onBlur={(e)=> {
      /* Call formiks default onBlur */
      field.onBlur(e);
      if (props.onBlur){
        /* Call custom onBlur */
        props.onBlur(e);
      }
    }}
    onChange={(e) => {
      field.onChange(e);
      if (props.onChange){
        props.onChange(e);
      }
    }}
    value={field.value || ''}
    error={meta.touched && Boolean(meta.error)}
    helperText={meta.error || helperText}
    InputProps={{
      inputComponent: props?.inputComponent,
    }}
    fullWidth
    />
  );
};
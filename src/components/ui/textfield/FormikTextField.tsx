import { InputAdornment, TextField } from '@mui/material';
import { useField } from 'formik';
import { FocusEvent, ChangeEvent, HTMLInputTypeAttribute } from 'react';


interface FormikTextFieldProps {
  name: string,
  label: string,
  id?: string,
  value?: string,
  onBlur?: (e: FocusEvent<any, Element>)=>void,
  onChange?: (e: ChangeEvent<any>) => void,
  onInput?:(e: ChangeEvent<any>) => void,
  placeholder?: string,
  helperText?: string,
  required?: boolean,
  inputComponent?: any,
  endAdornment?: JSX.Element | string,
  shrink?: boolean
  multiline?: boolean,
  rows?: number
  type?: HTMLInputTypeAttribute,
}

export const FormikTextField = (props: FormikTextFieldProps) => {
  const {
    helperText, label, placeholder, required,
    type = undefined,
    endAdornment,
    shrink = undefined,
    multiline = undefined,
    rows = undefined,
    id = undefined,
    onInput,
    value,
  } = props;
  const [field, meta] = useField(props);

  const handleChange = ((e: any)=>{
    field.onChange(e);
    if (props.onChange){
      props.onChange(e);
    }
  });

  return (
    <TextField  {...field}
    label={label}
    id={id}
    placeholder={placeholder}
    required={ required}
    type={type}
    onBlur={(e)=> {
      /* Call formiks default onBlur */
      field.onBlur(e);
      if (props.onBlur){
        /* Call custom onBlur */
        props.onBlur(e);
      }
    }}
    onChange={handleChange}
    onInput={onInput}
    value={value || field.value || ''}
    error={meta.touched && Boolean(meta.error)}
    helperText={meta.error || helperText}
    InputProps={{
      inputComponent: props?.inputComponent,
      endAdornment: <InputAdornment position='end'>{endAdornment}</InputAdornment>,
    }}
    InputLabelProps={{
      shrink,
    }}
    fullWidth
    multiline={multiline}
    rows={rows}
    />
  );
};
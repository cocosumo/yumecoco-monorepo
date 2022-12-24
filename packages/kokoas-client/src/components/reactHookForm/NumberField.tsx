import { TextFieldProps } from '@mui/material';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { TextField } from './TextField';

export function NumberField<T extends FieldValues>(
  {
    controllerProps,
    textFieldProps,
  }: {
    controllerProps: UseControllerProps<T>,
    textFieldProps: TextFieldProps,
  },

) {

  const {
    InputProps,
    ...otherTextFieldProps
  } = textFieldProps;

  return (
    <TextField 
      controllerProps={controllerProps}
      textFieldProps={{
        ...otherTextFieldProps,
        type: 'number',
        InputProps: {
          ...InputProps,
          inputProps: { style: { textAlign: 'right' } },
        },
      }} 
    />
  );
}
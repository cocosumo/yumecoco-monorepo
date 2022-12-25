import { TextField as MuiTextField } from '@mui/material';
import { ComponentProps } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';




export function TextField<T extends FieldValues>(
  {
    controllerProps,
    textFieldProps,
  }: {
    controllerProps: UseControllerProps<T>,
    textFieldProps: ComponentProps<typeof MuiTextField>,
  },

) {


  return (
    <Controller 
      {...controllerProps}
      render={({ field, fieldState }) => {
        const { error, isTouched } = fieldState;
        const isShowError = !!error && !!isTouched;

        return (
          <MuiTextField 
            {...textFieldProps}
            {...field} 
            fullWidth
            error={isShowError}
            helperText={isShowError ? error.message : ''}
          />
        );
      }}
    />
  );
}
import { TextField } from '@mui/material';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

export function NumberField<T extends FieldValues>(
  props: Omit<ControllerProps<T>, 'render'>,
) {

  return (
    <Controller 
      {...props}
      render={({ field, fieldState }) => {
        const { error, isTouched } = fieldState;
        const isShowError = !!error && !!isTouched;
        return (
          <TextField 
            {...field} 
            type="number"
            error={isShowError}
            helperText={isShowError ? error.message : ''}
          />
        );
      }}
    />
  );
}
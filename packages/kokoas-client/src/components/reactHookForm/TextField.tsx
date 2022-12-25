import { TextField as MuiTextField } from '@mui/material';
import { debounce } from 'lodash';
import { ComponentProps, useMemo } from 'react';
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

  const debouncedChange = useMemo(() => debounce((fn) => fn(), 500), []);

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
            onChange={(e) => {
              debouncedChange(()=>{
                field.onChange(e);
              });
            }}
            fullWidth
            error={isShowError}
            helperText={isShowError ? error.message : ''}
          />
        );
      }}
    />
  );
}
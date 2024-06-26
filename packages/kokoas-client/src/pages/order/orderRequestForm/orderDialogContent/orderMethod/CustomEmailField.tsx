import { TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';
import { useOrderFormContext } from '../../hooks/useOrderRHF';
import { Controller } from 'react-hook-form';


type CustomEmailFieldProps = TextFieldProps & {
  name: 'emailCc' | 'emailBcc';
};

export const defaultEmailFieldProps: TextFieldProps = {
  fullWidth: true,
  variant: 'outlined',
  size: 'small',
  placeholder: 'tantosha@company.com',
  type: 'email',
};


export const CustomEmailField = forwardRef<HTMLInputElement, CustomEmailFieldProps>(({
  name,
  ...props
}, ref) => {

  const { control } = useOrderFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ 
        field, 
        fieldState: { error }, 
      }) => (
        <TextField
          {...field}
          {...defaultEmailFieldProps}
          {...props}
          inputRef={ref}
          error={!!error}
          helperText={error?.message}
        />
      )}

    />
   
  );
});

CustomEmailField.displayName = 'CustomEmailField';
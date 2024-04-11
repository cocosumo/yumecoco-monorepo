import { TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';
import { useOrderFormContext } from '../../hooks/useOrderRHF';
import { Controller } from 'react-hook-form';


type CustomEmailFieldProps = TextFieldProps & {
  name: 'emailTo' | 'emailCc' | 'emailBcc';
};


export const CustomEmailField = forwardRef<HTMLInputElement, CustomEmailFieldProps>(({
  label,
  required,
  variant = 'outlined',
  size = 'small',
  placeholder = 'tantosha@company.com',
  type = 'email', 
  InputProps = {
    style: { maxWidth: '400px' },
  },
  name,
  ...props
}, ref) => {

  const { control } = useOrderFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          required={required}
          variant={variant}
          size={size}
          placeholder={placeholder}
          type={type}
          InputProps={InputProps}
          inputRef={ref}
          {...props}
        />
      )}

    />
   
  );
});

CustomEmailField.displayName = 'CustomEmailField';
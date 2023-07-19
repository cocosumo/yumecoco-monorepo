import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { KForm, KFormCustomer } from '../schema';
import { useTypedFormContext } from '../hooks/useTypedHooks';

export const ControlledTextField = ({
  name,
  label,
  width,
  maxWidth,
  placeholder,
  disabled = false,
  required,
  helperText,
}:{
  name: KForm | `customers.${number}.${KFormCustomer}`,
  label: string,
  width?: number,
  maxWidth?: number,
  placeholder?: string,
  disabled?: boolean,
  required?: boolean,
  helperText?: string,
}) => {
  const {
    control,
  } = useTypedFormContext();

  return (
    <Controller 
      control={control}
      name={name}
      render={({
        field,
        fieldState: {
          error,
          isTouched,
        },
        formState: {
          isSubmitted,
        },
      }) => {

        const showError = !!error?.message && (isTouched || isSubmitted);

        return (
          <TextField 
            {...field}
            label={label} 
            placeholder={placeholder}
            sx={{
              width,
              maxWidth,
            }}
            size='small'
            error={showError}
            helperText={showError ? error?.message : helperText}
            disabled={disabled}
            required={required}
          />
        );
      }}
    />

  );
};
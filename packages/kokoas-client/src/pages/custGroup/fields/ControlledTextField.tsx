import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { KForm } from '../schema';
import { useTypedFormContext } from '../hooks/useTypedHooks';

export const ControlledTextField = ({
  name,
  label,
  width,
  placeholder,
  disabled = false,
  required,
  helperText,
}:{
  name: KForm,
  label: string,
  width?: number;
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
      }) => {


        return (
          <TextField 
            {...field}
            label={label} 
            placeholder={placeholder}
            sx={{
              width,
            }}
            size='small'
            error={isTouched && !!error}
            helperText={error?.message || helperText}
            disabled={disabled}
            required={required}
          />
        );
      }}
    />

  );
};
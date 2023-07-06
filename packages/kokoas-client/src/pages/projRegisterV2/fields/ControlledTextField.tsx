import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../hooks/useTypedRHF';
import { KForm } from '../schema';

export const ControlledTextField = ({
  name,
  label,
  width,
  placeholder,
  disabled = false,
  required,
}:{
  name: KForm,
  label: string,
  width?: number;
  placeholder?: string,
  disabled?: boolean,
  required?: boolean,
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
            helperText={isTouched && error?.message}
            disabled={disabled}
            required={required}
          />
        );
      }}
    />

  );
};
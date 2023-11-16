import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../hooks/useTypedRHF';
import { KForm } from '../schema';
import { fieldMapJa } from '../api/fieldMapJa';

export const ControlledTextField = ({
  name,
  label,
  width,
  placeholder,
  disabled = false,
  required,
  helperText,
  fullWidth,
}:{
  name: KForm,
  label?: string,
  width?: number;
  placeholder?: string,
  disabled?: boolean,
  required?: boolean,
  helperText?: string,
  fullWidth?: boolean,
}) => {
  const {
    control,
  } = useTypedFormContext();

  return (
    <Controller 
      control={control}
      name={name}
      render={({
        field:{
          value,
          ...otherValue
        },
        fieldState: {
          error,
        },
      }) => {

        return (
          <TextField 
            {...otherValue}
            value={value || ''}
            label={label || fieldMapJa[name]} 
            placeholder={placeholder}
            sx={{
              width,
            }}
            size='small'
            error={!!error}
            helperText={error?.message || helperText}
            disabled={disabled}
            required={required}
            fullWidth={fullWidth}
          />
        );
      }}
    />

  );
};
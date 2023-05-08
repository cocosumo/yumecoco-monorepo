import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { JADatePicker } from 'kokoas-client/src/components';
import { TextField, TextFieldProps } from '@mui/material';

export const ControlledDatePicker = ({
  name,
  label,
  disabled = false,
  width,
  variant = 'standard',
  emphasized = false,

}: {
  name: keyof TypeOfForm
  label?: string,
  disabled?: boolean,
  width?: string,
  variant?: TextFieldProps['variant'],
  emphasized?: boolean,
}) => {


  const { control } = useFormContext<TypeOfForm>();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {
          onBlur,
          onChange,
          ref,
          value,
        },
        fieldState: {
          error,
          isTouched,
        },
      }) => {

        const isShowError = isTouched && !!error;

        return (
          <JADatePicker
            onChange={onChange}
            value={value || null}
            ref={ref}
            views={['year', 'month', 'day']}
            disabled={disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                variant={variant}
                label={label}
                onBlur={onBlur}
                error={isShowError}
                helperText={isShowError ? error.message : ''}
                sx={{
                  width,
                  ...(emphasized ? {
                    '& .MuiOutlinedInput-root': {
                      background: '#9CDAF9',
                    },
                  } : {}),
                }}
              />)}
          />
        );
      }}
    />
  );
};
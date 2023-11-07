import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { JADatePicker } from 'kokoas-client/src/components';
import { TextFieldProps } from '@mui/material';

export const ControlledDatePicker = ({
  name,
  label,
  disabled = false,
  width,
  variant = 'standard',
  emphasized = false,
  helperText,
}: {
  name: keyof TypeOfForm
  label?: string,
  disabled?: boolean,
  width?: string,
  variant?: TextFieldProps['variant'],
  emphasized?: boolean,
  helperText?: string,
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
            onClose={onBlur}      
            label={label}
            slotProps={{
              textField: {
                name,
                label,
                variant,
                onBlur,
                error: isShowError,
                size: 'small',
                helperText: isShowError 
                  ? error.message 
                  : helperText || '',
                sx: {
                  width,
                  ...(emphasized ? {
                    '& .MuiOutlinedInput-root': {
                      background: '#9CDAF9',
                    },
                  } : {}),
                },
              },
            }}
                  
          />
        );
      }}
    />
  );
};
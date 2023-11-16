import { Controller, useFormContext } from 'react-hook-form';
import { JADatePicker } from 'kokoas-client/src/components';
import { TextFieldProps } from '@mui/material';
import { TForm } from '../schema';
import { fieldMapJa } from '../api/fieldMapJa';

export const ControlledDatePicker = ({
  name,
  disabled = false,
  width,
  variant = 'outlined',
  emphasized = false,

}: {
  name: keyof TForm
  disabled?: boolean,
  width?: string,
  variant?: TextFieldProps['variant'],
  emphasized?: boolean,
}) => {


  const { control } = useFormContext<TForm>();
  const label = fieldMapJa[name];
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
        },
      }) => {

        const isShowError = !!error;



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
                helperText: isShowError ? error.message : '',
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
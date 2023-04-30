import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { JADatePicker } from 'kokoas-client/src/components';
import { TextField } from '@mui/material';

export const ControlledDatePicker = ({
  name,
  label,
  disabled = false,
}: {
  name: keyof TypeOfForm
  label?: string,
  disabled?: boolean,
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
            ref={ref}
            value={value || null}
            disablePast
            views={['year', 'month', 'day']}
            InputProps={{
              label: 'hello',
            }}
            disabled={disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                onBlur={onBlur}
                variant={'standard'}
                error={isShowError}
                helperText={isShowError ? error.message : ''}

              />)}
          />
        );
      }}
    />
  );
};
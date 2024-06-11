import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { JADatePicker } from 'kokoas-client/src/components';



export const ScheduledPayDate = () => {

  const { control } = useTypedFormContext();


  return (
    <Controller 
      name="scheduledPayDate"
      control={control}
      render={({ 
        field : {
          value,
          onChange,
          ref,
        },
        fieldState: {
          error,
        },
      }) => (
        <JADatePicker
          label='入金予定日'
          slotProps={{
            textField: {
              variant: 'outlined',
              size: 'small',
              inputRef: ref,
              error: !!error,
              helperText: error?.message,
              InputProps: {
                style: { width: '200px' },
              },
            },
          }}
          value={value}
          onChange={onChange}
        />
      )}
    />

  );
};

import { JADatePicker } from 'kokoas-client/src/components';
import { useOrderFormContext } from '../hooks/useOrderRHF';
import { Controller } from 'react-hook-form';

export const ExpectedDeliveryDate = () => {

  const { control } = useOrderFormContext();


  return (
    <Controller 
      name="expectedDeliveryDate"
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
          label='希望納期'
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
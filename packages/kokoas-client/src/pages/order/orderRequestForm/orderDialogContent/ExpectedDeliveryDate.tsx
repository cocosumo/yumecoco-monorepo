import { JADatePicker } from 'kokoas-client/src/components';

export const ExpectedDeliveryDate = () => {
  return (
    <JADatePicker
      label='希望納期'
      slotProps={{
        textField: {
          variant: 'outlined',
          size: 'small',
          fullWidth: true,
          InputProps:{
            style: { maxWidth: '200px' },
          },
        },
      }}
    />
  );
};
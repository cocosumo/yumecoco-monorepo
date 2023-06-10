import { Typography } from '@mui/material';
import { JADatePicker } from 'kokoas-client/src/components';
import { KeyOfForm, TypeOfForm } from '../schema';
import { Controller, useFormContext } from 'react-hook-form';




export const CustomDate = ({
  iconLabel,
  name,
}: {
  iconLabel: 'から' | 'まで'
  name: KeyOfForm
}) => {
  const { control } = useFormContext<TypeOfForm>();

  return (
    <Controller 
      name={name}
      control={control}
      render={({
        field: {
          value,
          onChange,
        },
      }) => (
        <JADatePicker
          onChange={onChange}
          value={value ?? null} // keep it controlled
          slots={{
            openPickerIcon: () =>   (
              <Typography variant='caption'>
                {iconLabel}
              </Typography>),
          }}
          slotProps={{
            textField: {
              variant: 'outlined',
              size: 'small',
              fullWidth: true,
            },
          }}
        />
      )}
    
    />

  );
};